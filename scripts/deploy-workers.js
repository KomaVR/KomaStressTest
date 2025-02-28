const { exec } = require('child_process');

for (let i = 1; i <= 100; i++) {
    exec(`wrangler publish --env worker${i}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error deploying worker${i}: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(`worker${i} deployed successfully: ${stdout}`);
    });
}
