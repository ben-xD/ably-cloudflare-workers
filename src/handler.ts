import Auth from "./auth";
import { v4 as uuidv4 } from 'uuid';

const auth = new Auth()

export function createToken(fetchEvent: FetchEvent, clientId?: string): void {
    if (!clientId) {
        clientId = uuidv4();
    }
  const tokenDetails = auth.createToken(clientId, (token) => {
      fetchEvent.respondWith(new Response(JSON.stringify(tokenDetails)))
  })
}
