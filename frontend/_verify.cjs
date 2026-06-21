const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('pageerror', (err) => errors.push(String(err)));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '_verify_top.png' });

  await page.evaluate(() => document.querySelector('#projects')?.scrollIntoView());
  await page.waitForTimeout(500);
  await page.screenshot({ path: '_verify_projects.png' });

  console.log('ERRORS:', JSON.stringify(errors));
  await browser.close();
})();
