async function authenticate(client, options) {
  const { authflow, version } = options;

  try {
    if (!authflow) throw new Error('Authflow is not defined')

    const MinecraftToken = (await authflow.getMinecraftBedrockServicesToken({ version })).mcToken

    const response = await fetch("https://authorization.franchise.minecraft-services.net/api/v1.0/multiplayer/session/start", {
      method: "POST",
      headers: {
        "accept": "*/*",
        "authorization": MinecraftToken,
        "content-type": "application/json",
        "User-Agent": "libhttpclient/1.0.0.0",
        "Accept-Language": "en-US",
        "Accept-Encoding": "gzip, deflate, br"
      },
      body: JSON.stringify({ publicKey: client.clientX509 })
    })

    const result = await response.json()
    if (result.code === "PlayerBanned") throw new Error(JSON.stringify({ "path": "/multiplayer/bedrock/authentication", "error": "FORBIDDEN" }))

    const token = result.result.signedToken
    const payload = token.split('.')[1]

    client.tokenData = JSON.parse(Buffer.from(payload, 'base64url').toString())
    client.token = token
  } catch (err) {
    console.error(err)
    client.emit('error', err)
  }
}

module.exports = { authenticate }