const fs = require('fs');

const path = 'C:\\Users\\Hamis\\.gemini\\antigravity\\brain\\537ec0fb-aec1-48cc-8377-bbee01e6c411\\cvyon_master_config_guide.md';
let content = fs.readFileSync(path, 'utf8');

// Insert B2B_API_KEY explanation
content = content.replace(
`### 5. Security & Crons (CRON_SECRET)
The \`CRON_SECRET\` is not a key you get from a third-party service; it is just a secure, random password you create yourself to protect your automated API endpoints from being triggered by strangers.
1. You can generate one quickly by opening your computer's terminal and typing: \`openssl rand -base64 32\`
2. Or you can simply mash your keyboard to create a long random string (e.g., \`MySuperSecretCronKey_123456789\`).
3. Paste that string into your Vercel Environment Variables as \`CRON_SECRET\`.
4. When configuring your Vercel Cron Jobs (in \`vercel.json\`), the system automatically passes this secret as an authorization header to securely trigger your job matches and CRM exports.`,
`### 5. Security & Custom Keys (CRON_SECRET & B2B_API_KEY)
The \`CRON_SECRET\` and \`B2B_API_KEY\` are not keys you get from a third-party service; they are simply secure, random passwords you create yourself. 
- **CRON_SECRET:** Protects your automated API endpoints (like nightly job matching) from being triggered by strangers.
- **B2B_API_KEY:** The master authorization token you can give to enterprise partners so they can query your talent pool API.

**How to generate them:**
1. You can generate one quickly by opening your computer's terminal and typing: \`openssl rand -base64 32\` (You can use this exact same format for both keys).
2. Or you can simply mash your keyboard to create a long random string (e.g., \`Cvyon_B2B_Master_Key_12345\`).
3. Paste these strings into your Vercel Environment Variables.
4. When configuring your Vercel Cron Jobs (in \`vercel.json\`), the system automatically passes the \`CRON_SECRET\` to securely trigger your jobs.`
);

fs.writeFileSync(path, content);
console.log('Updated B2B_API_KEY guide in cvyon_master_config_guide.md');
