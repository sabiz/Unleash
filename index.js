const package = require('./package.json')
const json5 = require('json5');
const fs = require('fs');
const carlo = require('carlo');
let appConfig = {};
try {
  appConfig = json5.parse(fs.readFileSync('./config.json5'));
} catch(err) {}


const CARLO_LAUNCH_OPTIONS = {
  title: package.name,
  width: appConfig.width || 1024,
  height: appConfig.height || 620,
  userDataDir: `${__dirname}/udata`,
};

const APP_URL = appConfig.app_url || 'https://www.google.com';

launch = async () => {
  const app = await carlo.launch(CARLO_LAUNCH_OPTIONS);
  app.serveFolder(__dirname);
  app.on('exit', () => process.exit());
  app.on('window', () =>{
    const win = app.mainWindow();
    win.on('close', ()=> app.exit());
  });
  await app.load(APP_URL);
};

launch();