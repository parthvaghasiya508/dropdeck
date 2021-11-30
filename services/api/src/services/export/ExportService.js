import puppeteer from 'puppeteer';

import config from '../../config';
import { logger } from '../../util/logger.js';

export const localService = () => !config.services.browserless.enabled;

export const ASPECT_RATIOS = {
  "4x3": 4 / 3,
  "16x10": 16 / 10,
  "16x9": 16 / 9
};

export const DEFAULT_ASPECT_RATIO = "16x10";

/**
 * Connects to a Chrome browser instance.
 *
 * @returns {!Promise<!Puppeteer.Browser>}
 */
const getBrowser = () => {

  if (localService()) {
    // By default, Docker runs a container with a /dev/shm shared memory space 64MB. This is typically too small
    // for Chrome and will cause Chrome to crash when rendering large pages. Since Chrome 65, we can launch the browser
    // with the --disable-dev-shm-usage flag to work around:
    const options = {

      headless: true,
      defaultViewport: {
        width: 2400,
        height: 1500,
        deviceScaleFactor: 1
      },
      userDataDir: config.services.browserless.userDataDir,
      ignoreHTTPSErrors: true,
      args: [
        '--font-render-hinting=none',
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--ignore-certificate-errors',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process', // <- this one doesn't works in Windows
        '--disable-gpu'
      ] // we are only launching own decks so we can skip sandbox!
    };
    return puppeteer.launch(options);
  }

  const tokenArg = config.services.browserless.token ? `?token=${config.services.browserless.token}` : '';
  const userDirArg = config.services.browserless.userDataDir ? `&--user-data-dir=${config.services.browserless.userDataDir}` : '';
  const endpoint = `${config.services.browserless.url}${tokenArg}${userDirArg}` +
    '&--no-sandbox=true' +
    '&--disable-setuid-sandbox=true' +
    '&--disable-dev-shm-usage=true' +
    '&--disable-accelerated-2d-canvas=true' +
    '&--disable-gpu=true';
  const options = {
    browserWSEndpoint: endpoint,
    defaultViewport: {
      width: 2400,
      height: 1500,
      deviceScaleFactor: 1
    },
    ignoreHTTPSErrors: true,
  };
  logger.debug(`Connecting to Browserless.io with ${endpoint}`);
  return puppeteer.connect(options);
};

/**
 * Close the browser session.
 *
 * @param browser Puppeteer browser.
 */
const closeBrowser = (browser) => {
  if (localService()) {
    browser.close();
  } else {
    browser.disconnect();
  }
};

const open = async (url, cookies = []) => {

  const start = Date.now();
  const browser = await getBrowser();
  const timeToGetBrowser = Date.now() - start;

  const startOpenPage = Date.now();
  const page = await browser.newPage();
  const timeToOpenPage = Date.now() - startOpenPage;

  // await page.setExtraHTTPHeaders({ Cookie: cookies });
  await page.setCookie(...cookies);

  logger.trace(`Setting cookies for request to ${url}:`);
  logger.trace(cookies);

  try {
    // networkidle0 waits for the network to be idle (no requests for 500ms).
    // The page's JS has likely produced markup by this point, but wait longer
    // if your site lazy loads, etc.
    const startGoToUrl = Date.now();
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.emulateMedia('screen');
    const timeToGoToUrl = Date.now() - startGoToUrl;

    return { page, browser, timeToOpenPage, timeToGetBrowser, timeToGoToUrl };

  } catch (err) {
    logger.error(err);
    throw new Error(`Error wen opening URL ${url}`);
  }
};

const MAX_WIDTH = 1600;
export const ExportService = {

  screenshot: async (deck, url, path, cookies, width = 800) => {

    if (width > MAX_WIDTH) width = MAX_WIDTH;

    const start = Date.now();

    // Set viewport in the slide's aspect ratio.
    const aspectRatio = ASPECT_RATIOS[deck.aspect || DEFAULT_ASPECT_RATIO];
    const height = Math.round(width / aspectRatio);
    const scaledUrl = `${url}?w=${width}&h=${height}`;

    const { page, browser, timeToOpenPage, timeToGetBrowser, timeToGoToUrl } = await open(scaledUrl, cookies);
    await page.setViewport({
      width,
      height
    });
    const startWaiting = Date.now();
    const slideContainer = await page.$('.slide');
    const timeToWait = Date.now() - startWaiting;
    if (slideContainer && slideContainer !== null) {
      const boundingBox = await slideContainer.boundingBox();

      const startRendering = Date.now();
      await page.screenshot({
        type: 'jpeg',
        quality: 95,
        clip: {
          x: boundingBox.x,
          y: boundingBox.y,
          width: Math.min(boundingBox.width, page.viewport().width),
          height: Math.min(boundingBox.height, page.viewport().height),
        },
        path,
      });
      const timeToRender = Date.now() - startRendering;
      await closeBrowser(browser);

      const totalTime = Date.now() - start;
      logger.debug(`Generated a screenshot of ${scaledUrl} in ${totalTime} ms:\n` +
        `  - ${timeToGetBrowser} ms to open browser\n` +
        `  - ${timeToOpenPage} ms to open a page in browser\n` +
        `  - ${timeToGoToUrl} ms to open the deck player\n` +
        `  - ${timeToWait} ms to wait for deck to load\n` +
        `  - ${timeToRender} ms to capture the screenshot`);

      const file = path;
      return { file, totalTime };
    }
    const totalTime = Date.now() - start;
    return { totalTime };
  },

  exportPdf: async (deck, fileName, url, cookies) => {
    const start = Date.now();

    // Set viewport in the slide's aspect ratio.
    const width = 800;
    const aspectRatio = ASPECT_RATIOS[deck.aspect || DEFAULT_ASPECT_RATIO];
    const height = Math.round(width / aspectRatio);

    const scaledUrl = `${url}?w=${width}&h=${height}`;
    logger.debug(`Requesting ${scaledUrl} and preparing for PDF export`);

    const { page, browser, timeToOpenPage, timeToGetBrowser, timeToGoToUrl } = await open(scaledUrl, cookies);

    // Set viewport in 16:10 (default aspect ratio)
    await page.setViewport({ width, height });

    const options = {
      path: fileName,
      width,
      height,
      margin: {
        top: '0',
        bottom: '0',
        right: '0',
        left: '0',
      },
      scale: 1,
      preferCSSPageSize: false,
      printBackground: true,
    };

    logger.debug(`Waiting for page to be rendered...`);
    const startWaiting = Date.now();
    await page.waitForFunction('window.deckLoaded === true');
    const timeToWait = Date.now() - startWaiting;

    logger.debug(`Page rendered - printing to PDF...`);
    try {
      const startRendering = Date.now();
      const pdf = await page.pdf(options); // serialized HTML of page DOM.
      await closeBrowser(browser);
      const timeToRender = Date.now() - startRendering;
      const totalTime = Date.now() - start;

      logger.debug(`Generated a PDF of ${scaledUrl} in ${totalTime} ms:\n` +
        `  - ${timeToGetBrowser} ms to open browser\n` +
        `  - ${timeToOpenPage} ms to open a page in browser\n` +
        `  - ${timeToGoToUrl} ms to open the deck player\n` +
        `  - ${timeToWait} ms to wait for deck to load\n` +
        `  - ${timeToRender} ms to capture the PDF`);

      return {
        pdf,
        totalTime,
      };
    } catch (e) {
      logger.error(`Error when exporting ${scaledUrl} to PDF`);
      logger.error(e);
      return {};
    }
  }
};
