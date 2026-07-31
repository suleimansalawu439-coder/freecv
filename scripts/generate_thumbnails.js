import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const templates = [
  'Academic', 'AcademicJournal', 'Classic', 'CorporateBlue', 'Diplomat',
  'Elegant', 'ElegantEditorial', 'Executive', 'ExecutiveSplit', 'Marketing',
  'MinimalistSplit', 'ModernGradient', 'SwissDesign', 'SwissGrid',
  'SwissMinimal', 'TechPro', 'TypographyFirst', 'ZenJapanese'
];

async function generateThumbnails() {
  console.log('Starting Thumbnail Generator...');
  
  // Create thumbnails dir if it doesn't exist
  const outputDir = path.join(__dirname, '../public/thumbnails');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    defaultViewport: { width: 816, height: 1056 }, // Standard US Letter size
  });
  
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  await page.setViewport({ width: 816, height: 1056 });

  // Add script to run before navigation to inject cookies/localStorage
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('cookieConsent', 'true');
    document.cookie = "cookieConsent=true; path=/";
  });

  for (const template of templates) {
    console.log(`Rendering ${template}...`);
    
    // We navigate to the builder page and set the template via query param or localStorage
    // For this script to work, make sure your dev server is running on localhost:3000
    await page.goto(`http://localhost:3000/preview?template=${template}`, { waitUntil: 'domcontentloaded' });
    
    // Wait for PDF preview to load (if using React-PDF viewer)
    try {
      await page.waitForSelector('.react-pdf__Page__canvas', { timeout: 10000 });
      // Give it a moment to render the canvas fully
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (e) {
      console.log(`Canvas not found for ${template}, proceeding with full page screenshot.`);
      console.log('PAGE CONTENT DUMP:', await page.content());
    }
    
    // Select the PDF preview container
    const element = await page.$('.react-pdf__Page__canvas');
    
    if (element) {
      await element.screenshot({ path: path.join(outputDir, `${template}.webp`), type: 'webp', quality: 90 });
      console.log(`Saved ${template}.webp`);
    } else {
      console.log(`Could not find preview element for ${template}. Taking full page screenshot instead.`);
      await page.screenshot({ path: path.join(outputDir, `${template}.webp`), type: 'webp', quality: 90 });
    }
  }

  await browser.close();
  console.log('Finished generating thumbnails!');
}

generateThumbnails().catch(console.error);
