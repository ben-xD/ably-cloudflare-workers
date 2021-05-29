import { createToken } from './handler'

addEventListener('fetch', async (event) => {
  const url = new URL(event.request.url)

  const fetchEvent = event as FetchEvent

  const clientId = url.searchParams.get('clientId')
  if (url.pathname == '/createTokenRequest' && event.request.method === 'GET') {
    const tokenRequest = await createToken(clientId)
    console.log(tokenRequest)
    return fetchEvent.respondWith(new Response(JSON.stringify(tokenRequest)))
  }

  if (url.pathname == '/bob' && event.request.method === 'GET') {
    return fetchEvent.respondWith(new Response(JSON.stringify({ name: 'bob' })))
  }

  fetchEvent.respondWith(new Response(null, { status: 400 }))
})
