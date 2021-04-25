const package = require('./package.json');
const json5 = require('json5');
const fs = require('fs');
const puppeteer = require('puppeteer-core');
let appConfig = {};
try {
  appConfig = json5.parse(fs.readFileSync('./config.json5'));
} catch(err) {}

const APP_URL = appConfig.app_url || 'https://www.google.com';

const LAUNCH_OPTIONS = {
  // LaunchOptions
  executablePath: appConfig.chrome,
  headless: false,
  handleSIGINT: false,

  // ChromeArgOptions
  devtools: false,
  userDataDir: './udata',
  args: [`--app=${APP_URL}`],

  // BrowserOptions
  defaultViewport: {
  },

};

launch = async () => {
  const width = appConfig.width || 1024;
  const height =  appConfig.height || 620;
  const browser = await puppeteer.launch(LAUNCH_OPTIONS);
  const page = (await browser.pages())[0];
  await page.setViewport({ width, height });
};

launch();