const fs = require('fs');

const workerConfigs = [];
const baseUrl = "https://koma-stress-test.vercel.app/"; // Your site's URL

for (let i = 1; i <= 100; i++) {
    workerConfigs.push(`
[env.worker${i}]
name = "worker${i}"
route = "${baseUrl}/worker${i}/*"  # Route for this worker
workers_dev = false
`);
}

const wranglerConfig = `
name = "stress-test-tool"
type = "javascript"
account_id = "32f870969d1f7668cc4e5a7d57f09f2c"  # Replace with your Cloudflare account ID

${workerConfigs.join('')}
`;

fs.writeFileSync('wrangler.toml', wranglerConfig);
console.log('Generated wrangler.toml with 100 worker configurations.');
