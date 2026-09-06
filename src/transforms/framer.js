const { types: { varint: [readVarInt, writeVarInt, sizeOfVarInt] } } = require('protodef')
const zlib = require('zlib')

class Framer {
  constructor(client) {
    this.packets = []
    this.updateCompressionSettings(client)
  }

  updateCompressionSettings(client) {
    this.batchHeader = null
    this.compressor = client.compressionAlgorithm || 'none'
    this.compressionLevel = client.compressionLevel
    this.compressionThreshold = client.compressionThreshold
    this.compressionHeader = client.compressionHeader || 0
    this.writeCompressor = !!client.compressionReady
  }

  compress(buffer) {
    return this.compressor === 'deflate'
      ? zlib.deflateRawSync(buffer, { level: this.compressionLevel })
      : buffer
  }

  static decompress(algorithm, buffer) {
    switch (algorithm) {
      case 0:
      case 'deflate':
        return zlib.inflateRawSync(buffer, { chunkSize: 512000 })
      case 255:
      case 'none':
        return buffer
      default:
        throw Error('Unknown compression type ' + algorithm)
    }
  }

  static decode(client, buf) {
    if (client.batchHeader && buf[0] !== client.batchHeader)
      throw Error(`bad batch packet header, received: ${buf[0]}, expected: ${client.batchHeader}`)

    const buffer = buf.slice(client.batchHeader ? 1 : 0)

    let decompressed

    if (client.compressionReady) {
      decompressed = this.decompress(buffer[0], buffer.slice(1))
    } else {
      try {
        decompressed = this.decompress(client.compressionAlgorithm, buffer)
      } catch {
        decompressed = buffer
      }
    }

    return this.getPackets(decompressed)
  }

  encode() {
    const buf = Buffer.concat(this.packets)
    const compressed = buf.length > this.compressionThreshold
    const header = []

    if (this.batchHeader) header.push(this.batchHeader)
    if (this.writeCompressor) header.push(compressed ? this.compressionHeader : 255)

    return Buffer.concat([Buffer.from(header), compressed ? this.compress(buf) : buf])
  }

  addEncodedPacket(chunk) {
    const size = sizeOfVarInt(chunk.byteLength)
    const buffer = Buffer.allocUnsafe(size + chunk.byteLength)

    writeVarInt(chunk.length, buffer, 0)
    chunk.copy(buffer, size)

    this.packets.push(buffer)
  }

  static getPackets(buffer) {
    const packets = []
    let offset = 0

    while (offset < buffer.length) {
      const { value, size } = readVarInt(buffer, offset)
      offset += size

      packets.push(buffer.slice(offset, offset + value))
      offset += value
    }

    return packets
  }
}

module.exports = { Framer }