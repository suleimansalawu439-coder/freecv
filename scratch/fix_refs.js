const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '..', 'components', 'templates');
const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(templatesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // We are replacing three things in one go, or sequentially.
  // 1. {ref.position} -> {ref.title}
  // 2. {ref.email && <span>E: {ref.email}</span>} -> {ref.contact && <span>{ref.contact}</span>}
  // 3. {ref.phone && <span>P: {ref.phone}</span>} -> "" (delete it since contact covers both)

  if (content.includes('ref.position') || content.includes('ref.email')) {
    content = content.replace(/\{ref\.position\}/g, '{ref.title}');
    content = content.replace(/\{ref\.email && <span[^>]*>E: \{ref\.email\}<\/span>\}/g, '{ref.contact && <span>{ref.contact}</span>}');
    content = content.replace(/\{ref\.phone && <span[^>]*>P: \{ref\.phone\}<\/span>\}/g, '');
    
    // Also catch some variations just in case
    content = content.replace(/ref\.position/g, 'ref.title');
    content = content.replace(/ref\.email/g, 'ref.contact');
    content = content.replace(/ref\.phone/g, 'ref.contact'); // Though this might duplicate, let's be careful.
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${file}`);
  }
}
