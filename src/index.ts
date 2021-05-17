import {createToken} from './handler'


addEventListener('fetch', (event) => {
    const url = new URL(event.request.url)

    const fetchEvent = event as FetchEvent;
    if (event.request.method === "GET") {
        const token = createToken(fetchEvent)
        fetchEvent.respondWith(new Response(JSON.stringify(token)))
        return
    }

    if (event.request.method === "POST" && url.searchParams.has("clientId")) {
        const clientId = url.searchParams.get("clientId")
        if (clientId) {
            return createToken(fetchEvent, clientId)
            // return fetchEvent.respondWith()
        } else {
            fetchEvent.respondWith(new Response("clientId query param required.", {status: 400}))
        }
    }

    fetchEvent.respondWith(new Response(null, {status: 400}))
})
