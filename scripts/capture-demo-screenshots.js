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
  await new Promise((resolve) => setTimeout(resolve, 1200));
}

async function openWithTheme(page, colorMode) {
  await page.evaluateOnNewDocument((mode) => {
    window.localStorage.setItem('colorMode', mode);
  }, colorMode);
  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await waitForTracks(page);
}

async function captureTheme(browser, colorMode) {
  const page = await browser.newPage();
  const prefix = colorMode;

  try {
    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
    await openWithTheme(page, colorMode);

    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${prefix}-desktop-track-list.png`),
      fullPage: true,
    });

    await page.click('.MusicListItem');
    await new Promise((resolve) => setTimeout(resolve, 1200));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${prefix}-desktop-now-playing.png`),
      fullPage: true,
    });

    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
    await openWithTheme(page, colorMode);
    await page.click('.MusicListItem');
    await new Promise((resolve) => setTimeout(resolve, 1200));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${prefix}-mobile-now-playing.png`),
      fullPage: true,
    });
  } finally {
    await page.close();
  }
}

async function capture() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: '/usr/local/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    await captureTheme(browser, 'dark');
    await captureTheme(browser, 'light');
  } finally {
    await browser.close();
  }

  const files = fs
    .readdirSync(OUTPUT_DIR)
    .filter((file) => file.endsWith('.png'))
    .sort();

  console.log(JSON.stringify({ outputDir: OUTPUT_DIR, files }, null, 2));
}

capture().catch((error) => {
  console.error(error);
  process.exit(1);
});
