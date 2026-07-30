const fs = require('fs');

const files = [
  'c:\\xampp\\htdocs\\freecv\\app\\api\\user\\resumes\\route.ts',
  'c:\\xampp\\htdocs\\freecv\\app\\api\\user\\resumes\\[id]\\route.ts',
  'c:\\xampp\\htdocs\\freecv\\app\\api\\stripe\\checkout\\route.ts'
];

const oldCode = `    const secret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET || 'super-secret-jwt-token-with-at-least-32-characters-long');`;
const newCode = `    let secretStr = process.env.SUPABASE_JWT_SECRET || 'super-secret-jwt-token-with-at-least-32-characters-long';
    // If it's a base64 encoded secret from the Supabase UI (no hyphens, typical for legacy JWT)
    const isBase64 = !secretStr.includes('-') && secretStr.length > 50;
    const secret = isBase64 ? Buffer.from(secretStr, 'base64') : new TextEncoder().encode(secretStr);`;

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes(oldCode)) {
      content = content.replace(oldCode, newCode);
      fs.writeFileSync(file, content);
      console.log('Updated: ' + file);
    }
  }
});
