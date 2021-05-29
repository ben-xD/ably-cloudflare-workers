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

  createTokenRequest = async (
    clientId: string,
  ): Promise<Ably.Types.TokenRequest | void> => {
    try {
      return await this.ably.auth.createTokenRequest({ clientId })
    } catch (e) {
      console.error('Create token request failed.')
      console.error(e)
    }
  }
}
