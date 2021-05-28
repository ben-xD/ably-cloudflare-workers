import { Types } from 'ably/ably'
// import * as Ably from 'ably/promises'
import * as Ably from 'ably/browser/static/ably-webworker.min'

// @ts-ignore
const ABLY_API_KEY = ABLY_PRIVATE_API_KEY

export default class Auth {
  private ably: Ably.Types.RestPromise

  constructor() {
    if (!ABLY_API_KEY) {
      console.error(`api key is ${ABLY_API_KEY}`)
    }
    const clientOptions: Ably.Types.ClientOptions = {
      key: ABLY_API_KEY,
    }
    this.ably = new Ably.Rest.Promise(clientOptions)
  }

  createToken = async (
    clientId: string,
    callback: (token: Types.TokenDetails) => void,
  ): Promise<Types.TokenDetails | void> => {
    console.log(`Creating a token for clientId: ${clientId}`)

    try {
      console.log("Trying to create token request...")
      const tokenRequest = await this.ably.auth.createTokenRequest({ clientId });
      console.log({tokenRequest})
      console.log("Create token request finished.")
    } catch (e) {
      console.error("Create token request failed.")
      console.error(e)
    }

    try {
      console.log("%cNow, separately trying to request token...", "color: blue")
      return await this.ably.auth.requestToken({ clientId })
      console.log("Request token finished.")
    } catch (e) {
      // This gets called, unknown error.
      console.error("Request token failed.")
      console.error(e)
    }
  }
}
