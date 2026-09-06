class realmAPI {
    BaseUrl = "https://bedrock.frontendlegacy.realms.minecraft-services.net";
    SecondaryBaseUrl = "https://frontend.realms.minecraft-services.net";

    constructor(flow) {
        this.maxRetries = 7;
        this.flow = flow;
    }

    async init() {
        this.authToken = await this.flow.getXboxToken("https://pocket.realms.minecraft.net/")
            .then(xbl => `XBL3.0 x=${xbl.userHash};${xbl.XSTSToken}`)

        this.id = null;
        this.realmAPIHeaders = {
            authorization: this.authToken,
            Accept: "*/*",
            charset: "utf-8",
            "client-ref": "7bc90e8887c29d13599eb19af6fc99c98dca4f9f",
            "client-version": "1.26.45",
            "x-networkprotocolversion": "2169",
            "x-clientplatform": "SAMSUNG SM-G955U",
            "content-type": "application/json",
            "user-agent": "MCPE/Android",
            "Accept-Language": "en-US",
            "Accept-Encoding": "gzip, deflate, br",
            Host: "pocket.realms.minecraft.net",
            Connection: "Keep-Alive"
        };
    }

    async #req(path, options = {}, name = "") {
        const url = typeof path === "string" && path.startsWith("http") ? path : `https://${this.realmAPIHeaders.Host}${path}`;

        for (this.retryCount = -1;; this.retryCount++) {
            if (this.retryCount > this.maxRetries) return { status: 429, body: { errorMsg: "Perxa has limited your request amount, please try again later.", errorCode: 429 } };

            try {
                const response = await fetch(url, {
                    ...options,
                    headers: {
                        ...this.realmAPIHeaders,
                        ...options.headers
                    },
                    signal: AbortSignal.timeout(15000)
                });

                if (response.status === 429) return { status: 429, body: { errorMsg: "It appears perxa has been ratelimited from realmsAPI, please retry again later.", errorCode: 429 } };

                if ([502, 503, 504].includes(response.status) || response.status >= 500) {
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    continue;
                }

                const contentType = response.headers.get("content-type") || "";
                const body = contentType.includes("application/json") 
                    ? await response.json()
                    : await response.text();

                if (response.status === 403 && body?.errorMsg === "Timeline Opt-In is required for each member") {
                    if (!this.id && url.includes("/join")) { this.id = url.match(/\/(\d+)\/join$/)?.[1] }
                    if (!this.id || !/^\d+$/.test(this.id)) return response

                    const storySettingsResponse = await this.postStorySettings(this.id, true, true, true, true)
                    if (storySettingsResponse.status === 204) { return await this.getRealmIP(this.id) }
                    else { return storySettingsResponse }
                }

                return { status: response.status, body };
            } catch (error) { console.error(`${name} failed request; `, error.message || error) }

            await new Promise(resolve => setTimeout(resolve, 3500));
        }
    }

    async get(path, name = "get") { return await this.#req(`${this.BaseUrl}${path}`, { method: "GET" }, name); }
    async post(path, name = "post", body = null) { return await this.#req(`${this.BaseUrl}${path}`, { method: "POST", body }, name); }
    async put(path, name = "put", body = null) { return await this.#req(`${this.BaseUrl}${path}`, { method: "PUT", body }, name); }
    async delete(path, name = "delete") { return await this.#req(`${this.BaseUrl}${path}`, { method: "DELETE" }, name); }

    async getRealmInfo(realmCode, fast = true) {    
        let body;

        const response = await this.get(`/worlds/v1/link/${realmCode}`, "getRealmInfo");

        if (response.status !== 200 || fast) return response;

        body = response.body;
        if (!body?.member) body.join = await this.joinRealm(realmCode) // to getRealmInfoByID we have to be a member!

        if (![200, 201, 204].includes(body.join?.status) && !body?.member) return body;

        return await this.getRealmInfoByID(body.id);
    }

    async getRealmInfoByID(realmID) {
        return await this.get(`/worlds/${realmID}`, "getRealmInfoByID");
    }

    async getRealmIP(realmID) {
        return await this.get(`/worlds/${realmID}/join`, "getRealmIP");
    }

    async postStorySettings(realmID, notifications = true, autostories = true, coordinates = true, timeline = true) {
        const body = JSON.stringify({ timeline, autostories, coordinates, notifications, playerOptIn: "OPT_IN", realmOptIn: "OPT_IN" });
        
        return await this.post(`/worlds/${realmID}/stories/settings`, "postStorySettings", body);
    }
}

module.exports = realmAPI;