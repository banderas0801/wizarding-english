import { chromium } from 'playwright';

(async () => {
  console.log("Launching browser...");
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Collect logs
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
  
  try {
    console.log('Navigating to http://localhost:5173/');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 8000 });
    console.log('DOM loaded. Waiting a bit...');
    await page.waitForTimeout(2000);
  } catch (e) {
    console.log('Navigation error/timeout:', e.message);
  } finally {
    await browser.close();
  }
})();
