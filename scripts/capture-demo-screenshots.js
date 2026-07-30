const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = '/opt/cursor/artifacts/screenshots';
const BASE_URL = 'http://localhost:3000';

async function waitForTracks(page) {
  await page.waitForSelector('.MusicListItem', { timeout: 20000 });
  await page.waitForFunction(() => {
    const item = document.querySelector('.MusicListItem');
    return item && item.textContent && !item.textContent.includes('undefined');
  }, { timeout: 20000 });
  await new Promise((resolve) => setTimeout(resolve, 1500));
}

async function capture() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: '/usr/local/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await waitForTracks(page);
    await page.screenshot({
      path: path.join(OUTPUT_DIR, '01-desktop-track-list.png'),
      fullPage: true,
    });

    await page.click('.MusicListItem');
    await new Promise((resolve) => setTimeout(resolve, 1200));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, '02-desktop-now-playing.png'),
      fullPage: true,
    });

    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await waitForTracks(page);
    await page.screenshot({
      path: path.join(OUTPUT_DIR, '03-mobile-track-list.png'),
      fullPage: true,
    });

    await page.click('.MusicListItem');
    await new Promise((resolve) => setTimeout(resolve, 1200));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, '04-mobile-now-playing.png'),
      fullPage: true,
    });

    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await waitForTracks(page);
    await page.click('.MusicListItem');
    await new Promise((resolve) => setTimeout(resolve, 800));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, '05-desktop-drawer.png'),
      fullPage: false,
    });
  } finally {
    await browser.close();
  }

  const files = fs.readdirSync(OUTPUT_DIR).filter((file) => file.endsWith('.png'));
  console.log(JSON.stringify({ outputDir: OUTPUT_DIR, files }, null, 2));
}

capture().catch((error) => {
  console.error(error);
  process.exit(1);
});
