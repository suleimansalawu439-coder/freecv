const fs = require('fs');
const path = require('path');

const modalPath = path.join(__dirname, 'components/builder/JobsModal.tsx');
let content = fs.readFileSync(modalPath, 'utf8');

// Replace the simulated fetch with actual fetch
const simulatedCode = `
      // We simulate an API call to Affiliate Job Board (e.g., Jooble)
      setTimeout(() => {
        setJobs([
          {
            id: 1,
            title: \`Senior \${userTitle}\`,
            company: 'TechCorp Global',
            location: userLocation,
            salary: '$120k - $150k',
            match: '98%',
            isPromoted: true,
            link: '#'
          },
          {
            id: 2,
            title: \`\${userTitle} (Remote)\`,
            company: 'InnovateX',
            location: 'Remote',
            salary: '$90k - $130k',
            match: '92%',
            link: '#'
          },
          {
            id: 3,
            title: \`Lead \${userTitle}\`,
            company: 'FutureWorks',
            location: userLocation,
            salary: '$140k+',
            match: '85%',
            link: '#'
          }
        ]);
        setLoading(false);
      }, 1500);`;

const actualCode = `
      // Actual API call to Affiliate Job Board
      fetch('/api/affiliate/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skills: userSkills,
          jobTitle: userTitle,
          location: userLocation
        })
      })
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setJobs(res.data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));`;

content = content.replace(simulatedCode, actualCode);

fs.writeFileSync(modalPath, content, 'utf8');
console.log('Updated JobsModal.tsx successfully.');
