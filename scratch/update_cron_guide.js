const fs = require('fs');

const path = 'C:\\Users\\Hamis\\.gemini\\antigravity\\brain\\537ec0fb-aec1-48cc-8377-bbee01e6c411\\cvyon_master_config_guide.md';
let content = fs.readFileSync(path, 'utf8');

// Insert CRON_SECRET explanation
content = content.replace(
`### 5. Gemini Setup (AI Engine)`,
`### 5. Security & Crons (CRON_SECRET)
The \`CRON_SECRET\` is not a key you get from a third-party service; it is just a secure, random password you create yourself to protect your automated API endpoints from being triggered by strangers.
1. You can generate one quickly by opening your computer's terminal and typing: \`openssl rand -base64 32\`
2. Or you can simply mash your keyboard to create a long random string (e.g., \`MySuperSecretCronKey_123456789\`).
3. Paste that string into your Vercel Environment Variables as \`CRON_SECRET\`.
4. When configuring your Vercel Cron Jobs (in \`vercel.json\`), the system automatically passes this secret as an authorization header to securely trigger your job matches and CRM exports.

### 6. Gemini Setup (AI Engine)`
);

// Fix the numbering below it
content = content.replace('### 6. Stripe Setup (Monetization)', '### 7. Stripe Setup (Monetization)');

fs.writeFileSync(path, content);
console.log('Updated CRON_SECRET guide in cvyon_master_config_guide.md');
