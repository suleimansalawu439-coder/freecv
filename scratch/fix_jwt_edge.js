const fs = require('fs');

const files = [
  'c:\\xampp\\htdocs\\freecv\\app\\api\\user\\resumes\\route.ts',
  'c:\\xampp\\htdocs\\freecv\\app\\api\\user\\resumes\\[id]\\route.ts',
  'c:\\xampp\\htdocs\\freecv\\app\\api\\stripe\\checkout\\route.ts'
];

const oldCode = `    const isBase64 = !secretStr.includes('-') && secretStr.length > 50;
    const secret = isBase64 ? Buffer.from(secretStr, 'base64') : new TextEncoder().encode(secretStr);`;
    
const newCode = `    const isBase64 = !secretStr.includes('-') && secretStr.length > 50;
    // Edge runtime compatible base64 decoding (Buffer is not available on Edge)
    const secret = isBase64 ? Uint8Array.from(atob(secretStr), c => c.charCodeAt(0)) : new TextEncoder().encode(secretStr);`;

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes(oldCode)) {
      content = content.replace(oldCode, newCode);
      fs.writeFileSync(file, content);
      console.log('Updated edge-compatible decoding: ' + file);
    }
  }
});
