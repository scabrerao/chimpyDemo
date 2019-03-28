const initializeWorld = require('../../utils/world.js');
const world = require('./worldMap.js');

const logger = require('../../utils/logUtils.js');

const hooks = function hook() {
  this.Before(function setWorld() {
    initializeWorld(this, world);
  });

  this.registerHandler('BeforeFeatures', () => {
      browser.windowHandleMaximize();
  });

  this.registerHandler('AfterFeatures', () => {
    try {
        browser.endAll();
    } catch (err) {
      logger.warning('Error was thrown when try to close browser');
    }
  });
};

module.exports = hooks;
