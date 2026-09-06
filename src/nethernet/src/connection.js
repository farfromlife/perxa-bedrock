const asBuffer = data => {
  if (Buffer.isBuffer(data)) return data
  if (typeof data === 'string') return Buffer.from(data)
  if (data instanceof ArrayBuffer) return Buffer.from(data)
  if (ArrayBuffer.isView(data)) return Buffer.from(data.buffer, data.byteOffset, data.byteLength)
    
  throw new TypeError('Unsupported RTC message type')
}

class Connection {
  constructor(nethernet, peer) {
    this.nethernet = nethernet
    this.peer = peer
    this.reliable = this.unreliable = null
    this.parts = []
    this.length = 0
    this.remaining = null
    this.queue = []
  }

  setChannels(reliable, unreliable) {
    this.reliable = reliable
    reliable.binaryType = 'arraybuffer'
    reliable.onmessage = ({ data }) => this.receive(data)
    reliable.onopen = () => this.flush()
    reliable.onerror = error => this.nethernet.emit('fault', error instanceof Error ? error : new Error('ReliableDataChannel error'))

    this.unreliable = unreliable
    unreliable.binaryType = 'arraybuffer'
    unreliable.onmessage = ({ data }) => {
      try {
        const frame = asBuffer(data)
        if (!frame.length || frame[0]) throw new Error('Invalid unreliable NetherNet frame')
        
        this.nethernet.emit('unreliable', frame.subarray(1))
      } catch (error) { this.nethernet.emit('fault', error) }
    }

    unreliable.onerror = error => this.nethernet.emit('fault', error instanceof Error ? error : new Error('UnreliableDataChannel error'))
  }

  receive(data) {
    try {
      const frame = asBuffer(data)
      if (!frame.length) throw new Error('Invalid NetherNet frame')

      const remaining = frame[0]
      if (this.remaining !== null && remaining !== this.remaining - 1) throw new Error('Invalid NetherNet fragment sequence')

      const payload = frame.subarray(1)

      this.parts.push(payload)
      this.length += payload.length
      this.remaining = remaining

      if (remaining) return;
      const message = this.parts.length === 1 ? this.parts[0] : Buffer.concat(this.parts, this.length)

      this.parts = []
      this.length = 0
      this.remaining = null

      this.nethernet.emit('encapsulated', message)
    } catch (error) {
      this.parts = []
      this.length = 0
      this.remaining = null
      this.nethernet.emit('fault', error)
    }
  }

  send(data) {
    const payload = asBuffer(data)
    if (!this.reliable || this.reliable.readyState === 'connecting') {
      this.queue.push(payload)
      return payload.length
    }

    if (this.reliable.readyState !== 'open') throw new Error(`ReliableDataChannel is ${this.reliable.readyState}`)
    this.sendReliable(payload)
    return payload.length
  }

  sendUnreliable(data) {
    const payload = asBuffer(data)
    if (!this.unreliable || this.unreliable.readyState !== 'open') throw new Error('UnreliableDataChannel is not open')
    if (payload.length > 50000) throw new RangeError('Unreliable NetherNet messages cannot be fragmented')

    const frame = Buffer.allocUnsafe(payload.length + 1)
    frame[0] = 0
    payload.copy(frame, 1)

    this.unreliable.send(frame)
    return payload.length
  }

  sendReliable(payload) {
    const count = Math.max(1, Math.ceil(payload.length / 50000))
    if (count > 256) throw new RangeError('NetherNet message requires more than 256 fragments')
    for (let i = 0, offset = 0; i < count; i++) {
      const length = Math.min(50000, payload.length - offset)

      const frame = Buffer.allocUnsafe(length + 1)
      frame[0] = count - i - 1;

      payload.copy(frame, 1, offset, offset + length)
      offset += length
      this.reliable.send(frame)
    }
  }

  flush() {
    const queue = this.queue
    this.queue = []

    for (const payload of queue) this.sendReliable(payload)
  }

  close() {
    this.queue.length = this.parts.length = 0
    this.reliable?.close()
    this.unreliable?.close()
    this.peer?.close()
  }
}

module.exports = { Connection }
