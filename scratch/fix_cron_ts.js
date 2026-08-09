const fs = require('fs');

const f1 = 'app/api/cron/export-delivery/route.ts';
let c1 = fs.readFileSync(f1, 'utf8');
c1 = c1.replace(
  "console.warn('[export-delivery] No BREVO_API_KEY found, skipping actual email send. Generated CSV for', candidates.length, 'candidates.');",
  "logger.warn('export-delivery', `No BREVO_API_KEY found, skipping actual email send. Generated CSV for ${candidates.length} candidates.`);"
);
c1 = c1.replace(
  "console.error('[export-delivery] Export Delivery Cron Error:', error);",
  "logger.error('export-delivery', 'Export Delivery Cron Error:', error);"
);
if (!c1.includes('import { logger }')) {
  c1 = "import { logger } from '@/lib/logger';\n" + c1;
}
fs.writeFileSync(f1, c1);


const f2 = 'app/api/cron/job-match/route.ts';
let c2 = fs.readFileSync(f2, 'utf8');
c2 = c2.replace(
  "console.log('[job-match] No jobs matched for candidate', profile.id, 'with keywords:', profile.skills);",
  "logger.info('job-match', `No jobs matched for candidate ${profile.id} with keywords: ${profile.skills}`);"
);
if (!c2.includes('import { logger }')) {
  c2 = "import { logger } from '@/lib/logger';\n" + c2;
}
fs.writeFileSync(f2, c2);

console.log('Fixed export-delivery and job-match TS errors.');
