const fs = require('fs');

const path = 'C:\\Users\\Hamis\\.gemini\\antigravity\\brain\\537ec0fb-aec1-48cc-8377-bbee01e6c411\\schema.sql';
let content = fs.readFileSync(path);

// If it's mixed encoding, let's just strip out the null bytes if there are any
let cleaned = '';
for (let i = 0; i < content.length; i++) {
  if (content[i] !== 0) { // Strip null bytes
    cleaned += String.fromCharCode(content[i]);
  }
}

fs.writeFileSync(path, cleaned, 'utf8');
console.log('Fixed schema.sql encoding');
