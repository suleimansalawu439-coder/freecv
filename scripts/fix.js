import fs from 'fs';
let lines = fs.readFileSync('app/page.tsx', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('catch(e) { throw new Error(text.includes(\'An error\')')) {
    // This is the catch line.
    // The previous line should be the try line.
    if (lines[i-1].includes('try { const err = JSON.parse(text); throw new Error(err.error); }')) {
      let timeoutMsg = lines[i].match(/'An error'\) \? '([^']+)'/)[1];
      
      lines[i-1] = `        let errMsg = '';\n        try { const err = JSON.parse(text); errMsg = err.error || \`API error: \${res.status}\`; }`;
      lines[i] = `        catch(e) { errMsg = text.includes('An error') ? '${timeoutMsg}' : \`API error: \${res.status}\`; }\n        throw new Error(errMsg);`;
    }
  }
}

fs.writeFileSync('app/page.tsx', lines.join('\n'));
console.log('Fixed error handlers in app/page.tsx line by line');
