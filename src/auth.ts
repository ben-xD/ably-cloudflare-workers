import * as Ably from 'ably/browser/static/ably-webworker.min'

// @ts-ignore
const ABLY_API_KEY = ABLY_PRIVATE_API_KEY

export default class Auth {
  private ably: Ably.Types.RestPromise

  constructor() {
    if (!ABLY_API_KEY) {
      console.warn(`api key is ${ABLY_API_KEY}`)
    }
    const clientOptions: Ably.Types.ClientOptions = {
      key: ABLY_API_KEY,
    }
    this.ably = new Ably.Rest.Promise(clientOptions)
  }

  createToken = async (
    clientId: string,
  ): Promise<Ably.Types.TokenRequest | void> => {
    console.log(`Creating a token for clientId: ${clientId}`)

    try {
      console.log('Trying to create token request...')
      const tokenRequest = await this.ably.auth.createTokenRequest({ clientId })
      console.log('Create token request finished.')
      return tokenRequest
    } catch (e) {
      console.error('Create token request failed.')
      console.error(e)
    }

    // try {
    //   console.log('%cNow, separately trying to request token...', 'color: blue')
    //   return await this.ably.auth.requestToken({ clientId })
    //   console.log('Request token finished.')
    // } catch (e) {
    //   // This gets called, unknown error.
    //   console.error('Request token failed.')
    //   console.error(e)
    // }
  }
}
