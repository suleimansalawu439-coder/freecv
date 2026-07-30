const fs = require('fs');

const path = 'C:\\Users\\Hamis\\.gemini\\antigravity\\brain\\537ec0fb-aec1-48cc-8377-bbee01e6c411\\cvyon_master_config_guide.md';
let content = fs.readFileSync(path, 'utf8');

// Update the JWT secret guide to reflect the new Supabase UI
content = content.replace(
`3. Go to **Project Settings -> API** and copy the \`JWT Secret\`.`,
`3. Go to **Project Settings -> JWT Keys** (on the left sidebar).
   - Under the "JWT Signing Keys" tab, you will see your active key.
   - However, in our codebase we use the \`jose\` library which requires the legacy HS256 secret.
   - Click the **Legacy JWT Secret** tab (next to "JWT Signing Keys").
   - Click the "Reveal" button.
   - Copy the extremely long base64 string (e.g., \`he0eU9ZCW/NRtsgPF74k...\`). This is your \`SUPABASE_JWT_SECRET\`.`
);

fs.writeFileSync(path, content);
console.log('Updated cvyon_master_config_guide.md');
