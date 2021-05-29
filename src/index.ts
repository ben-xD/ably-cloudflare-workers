import { createToken } from './handler'

addEventListener('fetch', async (event) => {
  const url = new URL(event.request.url)

  const fetchEvent = event as FetchEvent

  const clientId = url.searchParams.get('clientId')
  if (event.request.method === 'GET') {
    const tokenRequest = await createToken(clientId)
    console.log(tokenRequest)
    return fetchEvent.respondWith(new Response(JSON.stringify(tokenRequest)))
  }

  fetchEvent.respondWith(new Response(null, { status: 400 }))
})
