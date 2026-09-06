const { Client: BedrockClient } = require('../../index')

class Client extends BedrockClient {
    constructor(networkId, flow) {
        super({ authflow: flow, networkId })

        this.dateNow = Date.now()

        this.networkId = networkId;
        this.flow = flow;

        this.#connect()
    }

    async #connect() {
        const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timed out')), 10000))

        const connection = new Promise(resolve => {
            this.once('connectionAllowed', resolve)

            this.init()
        })

        Promise.race([connection, timeout])
            .then(() => {
                this.connect()

                this.on('disconnect', _ => console.log(`Client disconnected from ${this.networkId}`))
                this.on('kick', _ => console.log(`Client kicked from ${this.networkId}`))
                
                this.once('resource_packs_info', () => {
                    const payload = {
                        response_status: 'completed',
                        response_status_name: 'resourcepackstackfinished',
                        resourcepackids: []
                    }

                    this.once('resource_pack_stack', () => this.write('resource_pack_client_response', payload))
                    this.write('resource_pack_client_response', payload)

                    this.write('request_chunk_radius', { chunk_radius: 16, max_radius: 8 })

                    this.setupListeners()
                })
            })
            .catch(console.log);
    }

    setupListeners() {
        this.on('start_game', _ => console.log(`Client connected to ${this.networkId} after ${Date.now() - this.dateNow}MS`))
    }
}

module.exports = Client
