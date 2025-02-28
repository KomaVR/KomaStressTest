const fs = require('fs');

const workerConfigs = [];
for (let i = 1; i <= 100; i++) {
    workerConfigs.push(`
[env.worker${i}]
name = "worker${i}"
route = "worker${i}.your-domain.com/*"
workers_dev = false
`);
}

const wranglerConfig = `
name = "stress-test-tool"
type = "javascript"
account_id = "your-cloudflare-account-id"
zone_id = "your-zone-id"

${workerConfigs.join('')}
`;

fs.writeFileSync('wrangler.toml', wranglerConfig);
console.log('Generated wrangler.toml with 100 worker configurations.');
