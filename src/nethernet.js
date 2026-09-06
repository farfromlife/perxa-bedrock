const { Client } = require('./nethernet/index')

class NethernetClient {
  constructor({ networkId, token, ecdhKeyPair }) {
    this.connected = false
    this.onConnected = () => {}
    this.onCloseConnection = () => {}
    this.onEncapsulated = () => {}

    this.nethernet = new Client(networkId, token, ecdhKeyPair)
    this.nethernet.on('connected', () => {
      if (this.connected) return
      this.connected = true
      this.onConnected()
    })
    
    this.nethernet.on('disconnect', (_, reason) => {
      this.connected = false
      this.onCloseConnection(reason)
    })

    this.nethernet.on('encapsulated', buffer => this.onEncapsulated({ buffer }))
    this.nethernet.on('unreliable', buffer => this.onUnreliable({ buffer }))
    this.nethernet.on('fault', error => this.onError(error))

    this.onUnreliable = () => {}
    this.onError = error => console.error('[NetherNet]', error)
  }

  connect() { return this.nethernet.connect() }
  sendReliable(data) { return this.nethernet.send(data) }
  sendUnreliable(data) { return this.nethernet.connection?.sendUnreliable(data) }

  set credentials(value) { this.nethernet.credentials = value }
  get credentials() { return this.nethernet.credentials }

  set signalHandler(handler) { this.nethernet.signalHandler = handler }
  handleSignal(signal) { return this.nethernet.handleSignal(signal) }

  close() {
    this.connected = false
    this.nethernet.close()
  }
}

module.exports = { NethernetClient }
