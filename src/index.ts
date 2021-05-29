import { createTokenHandler } from './handler'

// Event listener cannot be async!
addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  const fetchEvent = event as FetchEvent

  const clientId = url.searchParams.get('clientId')
  if (url.pathname == '/createTokenRequest' && event.request.method === 'GET') {
    return fetchEvent.respondWith(createTokenHandler(event.request, clientId))
  }

  if (url.pathname == '/healthcheck' && event.request.method === 'GET') {
    return fetchEvent.respondWith(
      new Response(JSON.stringify({ health: '💯' })),
    )
  }

  fetchEvent.respondWith(new Response(null, { status: 400 }))
})
