const { EventEmitter, once } = require('node:events')
const { randomUUID } = require('node:crypto')
const { WebSocket } = require('ws')
const { SignalStructure } = require('../nethernet/index')

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

class NethernetJSONRPC extends EventEmitter {
  constructor(networkId, authflow, version, serverNetworkId) {
    super()

    this.networkId = networkId
    this.serverNetworkId = String(serverNetworkId)
    this.authflow = authflow
    this.version = version
    this.ws = null
    this.credentials = []
    this.pingInterval = null
    this.retryCount = 0
    this.destroyed = false
    this.lastLiveness = 0
  }

  async connect() {
    if (this.ws?.readyState === WebSocket.OPEN) throw new Error('Already connected signaling server')

    this.destroyed = false
    await this.open()

    await Promise.race([
      once(this, 'credentials'),
      wait(15000).then(() => { throw new Error('Signal TURN authentication timed out') })
    ])
  }

  async open() {
    const token = await this.authflow.getMinecraftBedrockServicesToken({ version: this.version })
    const authorization = token?.mcToken
    if (!authorization) throw new Error('Failed to get Minecraft Bedrock services token')

    const ws = this.ws = new WebSocket('https://signal.franchise.minecraft-services.net/ws/v1.0/messaging/connect', {
      headers: {
        Authorization: authorization,
        'session-id': randomUUID(),
        'request-id': randomUUID()
      }
    })

    this.lastLiveness = Date.now()
    ws.once('open', () => this.onOpen(ws))
    ws.on('close', (code, reason) => this.onClose(ws, code, reason.toString()))
    ws.on('error', error => this.emit('error', error))
    ws.on('message', data => this.onMessage(data))

    this.pingInterval ??= setInterval(() => this.ping(), 60000)
  }

  onOpen(ws) {
    if (ws !== this.ws) return
    this.retryCount = 0
    this.lastLiveness = Date.now()
    this.sendRpc({ params: {}, method: 'Signaling_TurnAuth_v1_0' })
  }

  ping() {
    const ws = this.ws
    if (!ws || ws.readyState !== WebSocket.OPEN) return

    this.sendRpc({ params: {}, method: 'System_Ping_v1_0' })
    if (Date.now() - this.lastLiveness > 90000) ws.terminate()
  }

  onMessage(data) {
    this.lastLiveness = Date.now()

    let message
    try {
      message = JSON.parse(Buffer.isBuffer(data) ? data.toString('utf8') : String(data))
    } catch {
      return
    }

    const turnServers = message.result?.TurnAuthServers
    if (Array.isArray(turnServers)) {
      this.credentials = turnServers
      return this.emit('credentials', turnServers)
    }

    if (message.method === 'System_Pong_v1_0') return this.reply(message.id)

    if (message.method === 'Signaling_ReceiveMessage_v1_0') this.receive(message)
  }

  receive(message) {
    this.reply(message.id)

    const params = Array.isArray(message.params)
      ? message.params
      : message.params ? [message.params] : []

    for (const param of params) {
      if (!param?.Message) continue
      this.sendDeliveryNotification(param.From, param.Id)

      let payload = param.Message
      try {
        const rpc = JSON.parse(payload)
        if (rpc.method === 'Signaling_DeliveryNotification_V1_0') continue
        if (rpc.method === 'Signaling_WebRtc_v1_0') payload = rpc.params?.message ?? payload
      } catch {}

      if (typeof payload !== 'string' || payload.includes('could not be delivered')) continue

      try {
        const signal = SignalStructure.fromString(payload)

        signal.networkId = this.networkId
        signal.serverNetworkId = param.From ?? this.serverNetworkId
        this.emit('signal', signal)
      } catch (error) {
        this.emit('error', error)
      }
    }
  }

  write(signal) {
    const ws = this.ws
    if (!ws || ws.readyState !== WebSocket.OPEN) throw new Error('WebSocket not connected')

    const id = randomUUID()
    const message = JSON.stringify({
      params: {
        netherNetId: String(signal.networkId),
        message: signal.toString()
      },
      jsonrpc: '2.0',
      method: 'Signaling_WebRtc_v1_0'
    })

    this.sendRpc({
      params: {
        toPlayerId: String(signal.serverNetworkId ?? this.serverNetworkId),
        messageId: id,
        message
      },
      method: 'Signaling_SendClientMessage_v1_0',
      id
    })
  }

  sendDeliveryNotification(toPlayerId, messageId) {
    if (!toPlayerId || !messageId || this.ws?.readyState !== WebSocket.OPEN) return

    const id = randomUUID()
    const message = JSON.stringify({
      params: { messageId },
      jsonrpc: '2.0',
      method: 'Signaling_DeliveryNotification_V1_0'
    })

    this.sendRpc({
      params: {
        toPlayerId: String(toPlayerId),
        messageId: id,
        message
      },
      method: 'Signaling_SendClientMessage_v1_0',
      id
    })
  }

  reply(id) {
    if (id == null) return
    this.ws?.send(JSON.stringify({ id, result: null, jsonrpc: '2.0' }))
  }

  sendRpc({ params = {}, method, id = randomUUID() }) {
    const ws = this.ws
    if (!ws || ws.readyState !== WebSocket.OPEN) return false
    ws.send(JSON.stringify({ params, jsonrpc: '2.0', method, id }))
    
    return true
  }

  async onClose(ws, code, reason) {
    if (ws !== this.ws) return
    this.ws = null

    if (this.destroyed) return

    const retryable = [1000, 1006, 1011, 4401, 0].includes(code)
    if (!retryable || this.retryCount >= 6) {
      this.stopTimer()
      return this.emit('error', new Error(`Signal closed: ${code} ${reason}`))
    }

    this.retryCount++
    await wait(Math.min(15000, 1000 * this.retryCount))
    if (this.destroyed) return

    try {
      await this.open()
    } catch (error) {
      this.emit('error', error)
    }
  }

  stopTimer() {
    clearInterval(this.pingInterval)
    this.pingInterval = null
  }

  async destroy() {
    this.destroyed = true
    this.stopTimer()

    const ws = this.ws
    this.ws = null
    if (!ws) return

    ws.removeAllListeners()
    if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
      await new Promise(resolve => {
        const timeout = setTimeout(resolve, 2000)
        ws.once('close', () => {
          clearTimeout(timeout)
          resolve()
        })
        try { ws.close(1000, 'Normal Closure') } catch { clearTimeout(timeout); resolve() }
      })
    }
  }
}

module.exports = { NethernetJSONRPC }
