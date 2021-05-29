import Auth from './auth'
import * as Ably from 'ably/browser/static/ably-webworker.min'
import { v4 as uuidv4 } from 'uuid'

const auth = new Auth()

export const createToken = async (
  clientId: string | null,
): Promise<Ably.Types.TokenRequest | void> => {
  if (!clientId) {
    clientId = uuidv4()
  }
  return await auth.createToken(clientId)
}
