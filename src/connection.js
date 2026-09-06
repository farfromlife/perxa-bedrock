const { EventEmitter } = require('events')
const { Framer } = require('./transforms/framer')

class Connection extends EventEmitter {
  batch = new Framer(this)

  write(name, params) {
    if (!this.batch?.addEncodedPacket) return
    try { this.batch.addEncodedPacket(this.serializer.createPacketBuffer({ name, params })) }
    catch (error) { console.log(error) }

    this.sendDecryptedBatch(this.batch)
  }

  sendBuffer(buffer) {
    if (!this.batch?.addEncodedPacket) return
    try { this.batch.addEncodedPacket(buffer) }
    catch (error) { console.log(error) }

    this.sendDecryptedBatch(this.batch)
  }

  sendDecryptedBatch(batch) { this.sendMCPE(batch.encode(), true) }

  sendEncryptedBatch(batch) {
    const buf = Buffer.concat(batch.packets)

    this.encrypt(buf)
  }

  sendMCPE(buffer, immediate) {
    try { this.connection.sendReliable(buffer, immediate) }
    finally { this.batch.packets = [] }
  }

  onEncryptedPacket = (buf) => {
    this.sendMCPE(this.batchHeader ? Buffer.concat([Buffer.from([this.batchHeader]), buf]) : buf)
  }

  onDecryptedPacket = (buf) => {
    const packets = Framer.getPackets(buf)
    for (let i = 0; i < packets.length; i++) this.readPacket(packets[i])
  }

  handle(buffer) {
    if (!this.batchHeader || buffer[0] === this.batchHeader) {
        const packets = Framer.decode(this, buffer)
        
        for (let i = 0; i < packets.length; i++) this.readPacket(packets[i])
    } else {
      throw Error('Bad packet header ' + buffer[0])
    }
  }
}

module.exports = { Connection }