import Auth from './auth'
import { v4 as uuidv4 } from 'uuid'

const auth = new Auth()

export const createTokenHandler = async (
  request: Request,
  clientId: string | null,
): Promise<Response> => {
  if (!clientId) {
    clientId = uuidv4()
  }

  const tokenRequest = await auth.createTokenRequest(clientId)
  return new Response(JSON.stringify(tokenRequest))
}
