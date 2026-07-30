const fs = require('fs');

// File 1: export-delivery/route.ts
const exportRoutePath = 'c:\\xampp\\htdocs\\freecv\\app\\api\\cron\\export-delivery\\route.ts';
let exportContent = fs.readFileSync(exportRoutePath, 'utf8');

const resendExportBlock = `    // 3. Send via Resend API
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmails = process.env.RECRUITER_EMAILS ? process.env.RECRUITER_EMAILS.split(',') : ['test@freecv.app'];

    if (resendApiKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': \`Bearer \${resendApiKey}\`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'FreeCV Talent Pool <talent@freecv.app>',
          to: recipientEmails,
          subject: 'Weekly FreeCV Talent Pool Update',
          html: \`<p>Hello,</p><p>Attached is the weekly export of new candidates who have opted into the FreeCV Talent Pool.</p><p>Total new candidates: \${candidates.length}</p>\`,
          attachments: [
            {
              filename: \`freecv-talent-pool-\${new Date().toISOString().split('T')[0]}.csv\`,
              content: csvBase64
            }
          ]
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(\`Resend API Error: \${JSON.stringify(errData)}\`);
      }
    } else {
      console.warn('No RESEND_API_KEY found, skipping actual email send. Generated CSV for', candidates.length, 'candidates.');
    }`;

const brevoExportBlock = `    // 3. Send via Brevo API
    const brevoApiKey = process.env.BREVO_API_KEY;
    const recipientEmails = process.env.RECRUITER_EMAILS ? process.env.RECRUITER_EMAILS.split(',') : ['test@freecv.app'];

    if (brevoApiKey) {
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': brevoApiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: 'FreeCV Talent Pool', email: 'talent@freecv.app' },
          to: recipientEmails.map(email => ({ email: email.trim() })),
          subject: 'Weekly FreeCV Talent Pool Update',
          htmlContent: \`<p>Hello,</p><p>Attached is the weekly export of new candidates who have opted into the FreeCV Talent Pool.</p><p>Total new candidates: \${candidates.length}</p>\`,
          attachment: [
            {
              name: \`freecv-talent-pool-\${new Date().toISOString().split('T')[0]}.csv\`,
              content: csvBase64
            }
          ]
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(\`Brevo API Error: \${JSON.stringify(errData)}\`);
      }
    } else {
      console.warn('No BREVO_API_KEY found, skipping actual email send. Generated CSV for', candidates.length, 'candidates.');
    }`;

if (exportContent.includes('RESEND_API_KEY')) {
  exportContent = exportContent.replace(resendExportBlock, brevoExportBlock);
  fs.writeFileSync(exportRoutePath, exportContent);
}

// File 2: job-match/route.ts
const jobMatchRoutePath = 'c:\\xampp\\htdocs\\freecv\\app\\api\\cron\\job-match\\route.ts';
let jobMatchContent = fs.readFileSync(jobMatchRoutePath, 'utf8');

jobMatchContent = jobMatchContent.replace(
  `// Assuming we use Resend REST API as configured before\n// const resend = new Resend(process.env.RESEND_API_KEY);\n`,
  ''
);

const resendJobBlock = `            // Send Email to candidate
            await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Authorization': \`Bearer \${process.env.RESEND_API_KEY}\`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                from: 'FreeCV Jobs <jobs@freecv.app>',
                to: candidate.email,
                subject: \`New High-Match Job: \${job.title} at \${job.recruiters.company_name}\`,
                html: \`
                  <h2>We found a great match for your profile!</h2>
                  <p><strong>\${job.recruiters.company_name}</strong> is looking for a <strong>\${job.title}</strong>.</p>
                  <p>Based on your FreeCV resume, you have an <strong>\${matchResult.score}% match</strong> for this role!</p>
                  <hr/>
                  <p>Log in to FreeCV to view more details and connect with the recruiter.</p>
                \`
              })
            });`;

const brevoJobBlock = `            // Send Email to candidate via Brevo
            await fetch('https://api.brevo.com/v3/smtp/email', {
              method: 'POST',
              headers: {
                'api-key': process.env.BREVO_API_KEY as string,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                sender: { name: 'FreeCV Jobs', email: 'jobs@freecv.app' },
                to: [{ email: candidate.email }],
                subject: \`New High-Match Job: \${job.title} at \${job.recruiters.company_name}\`,
                htmlContent: \`
                  <h2>We found a great match for your profile!</h2>
                  <p><strong>\${job.recruiters.company_name}</strong> is looking for a <strong>\${job.title}</strong>.</p>
                  <p>Based on your FreeCV resume, you have an <strong>\${matchResult.score}% match</strong> for this role!</p>
                  <hr/>
                  <p>Log in to FreeCV to view more details and connect with the recruiter.</p>
                \`
              })
            });`;

if (jobMatchContent.includes('api.resend.com')) {
  jobMatchContent = jobMatchContent.replace(resendJobBlock, brevoJobBlock);
  fs.writeFileSync(jobMatchRoutePath, jobMatchContent);
}

console.log('Successfully replaced Resend with Brevo.');
