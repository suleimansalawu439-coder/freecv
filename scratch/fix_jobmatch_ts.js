const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'app', 'api', 'cron', 'job-match', 'route.ts');
let content = fs.readFileSync(file, 'utf8');

// I probably missed a replace in job-match.
content = content.replace(
  "logger.warn('job-match', 'No BREVO_API_KEY, skipping actual email send for', matchesCount, 'matches');",
  "logger.warn('job-match', `No BREVO_API_KEY, skipping actual email send for ${matchesCount} matches`);"
);

fs.writeFileSync(file, content);
console.log('Fixed job-match TS error.');
