const portWebDriverio = Math.floor(Math.random() * 5000) + 1000;
const portChimp = Math.floor(Math.random() * 9000) + 1000;

const path = require('path');
const moment = require('moment');
const logger = require('./utils/logUtils.js');

const reportPath = `./report_output`;
logger.log(`WebDriverio running in port: ${portWebDriverio}`);
logger.log(`Chimp running in port: ${portChimp}`);

// Obtain all parameters to prepare the execution

const testDesiredCapabilities = {
  browserName: 'chrome',
  maxInstances: 1,
  unexpectedAlertBehaviour: 'accept',
  webStorageEnabled: true,
  chromeOptions: {
    args: [
      '--disable-web-security',
      '--disable-popup-blocking',
      '--window-size=1280,1024',
      '--window-position=0,0',
      '--ignore-autocomplete-off-autofill',
      '--ignore-certificate-errors'],
    prefs: {
      download: {
        prompt_for_download: false,
        directory_upgrade: true,
      },
    },
  },
  javascriptEnabled: true,
  acceptSslCerts: true,
};

module.exports = {
  // - - - - CHIMP - - - -
  watch: false,
  watchTags: '@watch,@focus',
  domainSteps: null,
  e2eSteps: null,
  fullDomain: false,
  domainOnly: false,
  e2eTags: '@e2e',
  watchWithPolling: false,
  server: false,
  serverPort: portChimp,
  serverHost: 'localhost',
  sync: true,
  offline: false,
  showXolvioMessages: false,


  // - - - - SESSION-MANAGER  - - - -
  noSessionReuse: false,

  // - - - - GULP CHIMP - - - -
  singleRun: true,


  // - - - - CUCUMBER REPORT - - - -
  htmlReport: true,
  theme: 'bootstrap',
  jsonDir: `${reportPath}`,
  jsonFile: `${reportPath}/cucumberReport.json`,
  output: `${reportPath}/report/`,
  reportSuiteAsScenarios: true,
  launchReport: true,
  storeScreenShots: true,
  DeleteRepoAfter: 10000,

  // - - - - CUCUMBER - - - -
  path: `./features`,
  singleSnippetPerFile: true,
  recommendedFilenameSeparator: '_',
  chai: false,
  screenshotsOnError: true,
  screenshotsPath: `${reportPath}/screenshots`,
  captureAllStepScreenshots: false,
  saveScreenshotsToDisk: false,
  saveScreenshotsToReport: true,
  jsonOutput: `${reportPath}/cucumberReport.json`,
  conditionOutput: true,
  backtrace: false, // <boolean> show full backtrace for errors
  colors: true, // <boolean> disable colors in formatter output
  failFast: false, // <boolean> abort the run on first failure
  format: 'pretty',
  ignoreUndefinedDefinitions: true,
  snippets: true, // <boolean> hide step definition snippets for pending steps
  source: false, // <boolean> hide source URIs
  strict: false, // <boolean> fail if there are any undefined or pending steps
  timeout: 200000,
  waitUntiltimeout: 60000,

  // - - - - WEBDRIVER-IO  - - - -
  webdriverio: {
    desiredCapabilities: testDesiredCapabilities,
    deprecationWarnings: false,
    // Level of logging verbosity: silent | verbose | command | data | result | error
    logLevel: 'silent',
    logOutput: `${reportPath}/logs`,
    host: '127.0.0.1',
    port: portWebDriverio,
    path: '/wd/hub',
    baseUrl: 'http://localhost',
    coloredLogs: true,
    screenshotPath: `${reportPath}/screenshots`,
    bail: 5,
    waitforTimeout: 20000,
    waitforInterval: 250,
  },

  seleniumStandaloneOptions: {
    // check for more recent versions of selenium here:
    // http://selenium-release.storage.googleapis.com/index.html
    version: '3.9.1',
    baseURL: 'https://selenium-release.storage.googleapis.com',
    drivers: {
      chrome: {
        // check for more recent versions of chrome driver here:
        // http://chromedriver.storage.googleapis.com/index.html
        version: '2.35',
        arch: process.arch,
        baseURL: 'https://chromedriver.storage.googleapis.com',
      },
      ie: {
        // check for more recent versions of internet explorer driver here:
        // http://selenium-release.storage.googleapis.com/index.html
        version: '3.0.0',
        arch: 'ia32',
        baseURL: 'https://selenium-release.storage.googleapis.com',
      },
      firefox: {
        // check for more recent versions of gecko  driver here:
        // https://github.com/mozilla/geckodriver/releases
        version: '0.20.1',
        arch: process.arch,
        baseURL: 'https://github.com/mozilla/geckodriver/releases/download',
      },
    },
  },

  // - - - - DEBUGGING  - - - -
  log: 'info',
  debug: false,
  seleniumDebug: null,
  debugCucumber: null,
  debugBrkCucumber: null,
  debugMocha: null,
  debugBrkMocha: null,
};
