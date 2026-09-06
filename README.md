# perxa-bedrock

A rewrite of [BedrockX](https://github.com/thejfkvis/BedrockX) focused on maintaining an updated Minecraft Bedrock protocol, fixing protocol issues, improving NetherNet support, and providing JavaScript and TypeScript IntelliSense.

Based on [BedrockX](https://github.com/thejfkvis/BedrockX) and regularly updated as the Minecraft Bedrock protocol changes.

> [!IMPORTANT]
> **Current version: 1.26.45**

## About

`perxa-bedrock` is a rewrite of BedrockX focused on keeping the Minecraft Bedrock protocol up to date with the latest releases.

## Features

* Based on BedrockX
* Packet definitions generated from `protocol/protocol.json`
* JavaScript and TypeScript IntelliSense support
* Typed packet names and packet fields
* Typed `.write()` support
* Typed `.on()` and `.once()` events
* NetherNet transport support
* CommonJS declaration support

## Supported Autocomplete

* `Client.write(packet, fields)`
* `Client.on(...)`
* `Client.once(...)`
* Packet names generated from `src/protocol/protocol.json`
* Packet-specific field names
* NetherNet transport events and methods

```js
client.write("request_network_settings", { client_protocol: 2169 })
```

Events also include typings, allowing for ease of use.

```js
client.on("connectionAllowed", () => console.log("Connected"))
client.once("disconnect", reason => console.log(reason))
```

# Status

> [!IMPORTANT]
> The project is actively maintained and updated alongside Minecraft Bedrock protocol changes.

**Current version: 1.26.45**

# Credits

Based on [BedrockX](https://github.com/thejfkvis/BedrockX) by [thejfkvis](https://github.com/thejfkvis).
