let isStressTestRunning = false;
let abortController = null;
let workerUrls = []; // Array to store worker URLs

// Fetch worker URLs from the server
async function fetchWorkerUrls() {
    try {
        const response = await fetch('/get-worker-urls');
        workerUrls = await response.json();
        console.log('Worker URLs loaded:', workerUrls);
    } catch (error) {
        console.error('Failed to fetch worker URLs:', error);
    }
}

// Start the stress test
document.getElementById('startButton').addEventListener('click', async () => {
    if (isStressTestRunning) return;

    const targetIp = document.getElementById('targetIp').value;
    if (!targetIp) {
        alert('Please enter a target IP.');
        return;
    }

    // Enable stop button and disable start button
    document.getElementById('startButton').disabled = true;
    document.getElementById('stopButton').disabled = false;
    document.getElementById('status').textContent = 'Status: Stress test running...';

    isStressTestRunning = true;
    abortController = new AbortController();

    // Start sending requests indefinitely using all workers
    while (isStressTestRunning) {
        try {
            const requests = workerUrls.map(workerUrl =>
                fetch(workerUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ targetIp }),
                    signal: abortController.signal
                })
            );
            await Promise.all(requests);
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Stress test stopped.');
            } else {
                console.error('Error during stress test:', error);
            }
        }
    }
});

// Stop the stress test
document.getElementById('stopButton').addEventListener('click', () => {
    if (!isStressTestRunning) return;

    // Stop the stress test
    isStressTestRunning = false;
    abortController.abort();

    // Enable start button and disable stop button
    document.getElementById('startButton').disabled = false;
    document.getElementById('stopButton').disabled = true;
    document.getElementById('status').textContent = 'Status: Stress test stopped.';
});

// Fetch worker URLs when the page loads
fetchWorkerUrls();
