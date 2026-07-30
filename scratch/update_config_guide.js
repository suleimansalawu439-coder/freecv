const fs = require('fs');

const path = 'C:\\Users\\Hamis\\.gemini\\antigravity\\brain\\537ec0fb-aec1-48cc-8377-bbee01e6c411\\cvyon_master_config_guide.md';
let content = fs.readFileSync(path, 'utf8');

// Replace the email section in the .env block
content = content.replace(
`# 6. Email Delivery (Dual Engine: Brevo + Namecheap SMTP)
# Brevo REST API
BREVO_API_KEY=xkeysib-your-brevo-key
# Namecheap SMTP
SMTP_HOST=mail.privateemail.com # Or your specific Namecheap Stellar server (e.g., serverXXX.web-hosting.com)
SMTP_PORT=465
SMTP_USER=jobs@cvyon.com
SMTP_PASSWORD=your-cpanel-email-password`,
`# 6. Email Delivery (Automated Edge Sending)
# Brevo REST API handles all bulk/automated sending (noreply@cvyon.com)
BREVO_API_KEY=xkeysib-your-brevo-key`
);

// Replace the email step-by-step section
content = content.replace(
`### 2. Email Setup (Stellar Plus SMTP + Brevo)
Because Vercel Edge functions cannot use standard SMTP protocols easily, our email API endpoints will be configured to run on Vercel's standard Node.js serverless functions. 
We will use **Nodemailer** for Namecheap SMTP and **Fetch** for the Brevo REST API. 

**Namecheap Mailbox Setup:**
1. Log into your Namecheap cPanel (Stellar Plus).
2. Go to **Email Accounts** and create your mailboxes (\`contact@cvyon.com\`, \`jobs@cvyon.com\`, etc.).
3. Note your password and the Outgoing Server settings (usually \`mail.cvyon.com\` or your specific shared server hostname, Port \`465\` for SSL). Put these in \`SMTP_HOST\`, \`SMTP_PORT\`, \`SMTP_USER\`, and \`SMTP_PASSWORD\`.

**Brevo Setup:**
1. Log into Brevo, go to **SMTP & API** -> **API Keys**, and generate a key for \`BREVO_API_KEY\`.
2. Go to **Senders & Domains**, add \`cvyon.com\`, and verify it by adding the provided TXT/DKIM records to your Namecheap Advanced DNS.`,
`### 2. Email Setup (The Split Architecture)
Cvyon uses a professional split architecture for email:
- **Namecheap SMTP Mailbox:** Used purely for personal, 1:1 outbound communication and receiving emails (\`contact@cvyon.com\`, \`support@cvyon.com\`). You manage this via Namecheap cPanel/Webmail.
- **Brevo Free:** Used purely for bulk/automated sending from Vercel Edge Functions (\`noreply@cvyon.com\`).

**DNS Configuration (Namecheap Advanced DNS):**
You must combine your records so both systems are authorized to send on behalf of \`cvyon.com\`:
1. **MX Record:** Points to \`mail.cvyon.com\` (or Namecheap's shared mail server) for receiving.
2. **SPF Record (TXT):** Combine both! E.g., \`v=spf1 include:spf.web-hosting.com include:spf.brevo.com ~all\`.
3. **DKIM (TXT):** Add both the Namecheap cPanel DKIM key and the Brevo DKIM key as separate TXT records.
4. **DMARC (TXT):** \`_dmarc.cvyon.com\` -> \`v=DMARC1; p=quarantine; rua=mailto:privacy@cvyon.com\`.

**Brevo Setup for Vercel:**
1. Log into Brevo, go to **SMTP & API** -> **API Keys**, and generate a key for \`BREVO_API_KEY\`. Put this in your Vercel Environment Variables.`
);

fs.writeFileSync(path, content);
console.log('Updated cvyon_master_config_guide.md');
