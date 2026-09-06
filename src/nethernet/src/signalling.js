class SignalStructure {
  constructor(type, connectionId, data = '', networkId = null, serverNetworkId = null) {
    this.type = type
    this.connectionId = connectionId
    this.data = data
    this.networkId = networkId
    this.serverNetworkId = serverNetworkId
  }

  toString() {
    return `${this.type} ${this.connectionId} ${this.data}`
  }

  static fromString(message) {
    const first = message.indexOf(' ')
    if (first < 1) throw new Error('Invalid NetherNet signal')
    const second = message.indexOf(' ', first + 1)
    return new SignalStructure(
      message.slice(0, first),
      message.slice(first + 1, second < 0 ? undefined : second),
      second < 0 ? '' : message.slice(second + 1)
    )
  }
}

module.exports = { SignalStructure }
