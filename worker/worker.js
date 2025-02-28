addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    if (request.method === 'POST') {
        const { targetIp } = await request.json();

        // Simulate traffic by sending a request to the target IP
        try {
            await fetch(`http://${targetIp}`);
            return new Response('Request sent.', { status: 200 });
        } catch (error) {
            return new Response('Failed to send request.', { status: 500 });
        }
    }

    return new Response('Invalid request method.', { status: 400 });
}
