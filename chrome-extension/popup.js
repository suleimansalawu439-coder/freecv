document.getElementById('extractBtn').addEventListener('click', async () => {
  const btn = document.getElementById('extractBtn');
  const statusText = document.getElementById('statusText');
  
  btn.disabled = true;
  btn.textContent = 'Extracting...';
  statusText.textContent = 'Analyzing job description...';

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Inject the content script to scrape the job description
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: scrapeJobDescription
    });

    const jobData = results[0]?.result;
    
    if (!jobData || !jobData.description) {
      throw new Error('Could not find job description on this page.');
    }

    statusText.textContent = 'Job found! Redirecting to Cvyon...';

    // Encode the JD and redirect to Cvyon builder with the JD pre-filled
    const url = new URL('https://cvyon.com/');
    url.searchParams.set('jobTitle', jobData.title || '');
    url.searchParams.set('company', jobData.company || '');
    url.searchParams.set('jd', encodeURIComponent(jobData.description));
    url.searchParams.set('atsOpen', 'true');
    
    chrome.tabs.create({ url: url.toString() });
    
  } catch (err) {
    statusText.textContent = 'Error: ' + err.message;
    statusText.style.color = 'red';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Score My Match';
  }
});

function scrapeJobDescription() {
  let title = '';
  let company = '';
  let description = '';

  const host = window.location.hostname;

  if (host.includes('linkedin.com')) {
    title = document.querySelector('.job-details-jobs-unified-top-card__job-title')?.innerText || '';
    company = document.querySelector('.job-details-jobs-unified-top-card__company-name')?.innerText || '';
    description = document.querySelector('#job-details')?.innerText || '';
  } else if (host.includes('indeed.com')) {
    title = document.querySelector('.jobsearch-JobInfoHeader-title')?.innerText || '';
    company = document.querySelector('[data-company-name="true"]')?.innerText || '';
    description = document.querySelector('#jobDescriptionText')?.innerText || '';
  }

  // Fallback for generic pages or other sites
  if (!description) {
    // Try some common generic selectors
    description = document.querySelector('[class*="description" i]')?.innerText || document.body.innerText;
  }

  // Truncate to reasonable length (e.g. 5000 chars) to prevent giant URL payloads
  if (description.length > 5000) {
    description = description.substring(0, 5000) + '...';
  }

  return { title, company, description };
}
