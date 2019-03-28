
/**
 * Utilities for logging.
 */

const colors = require('colors');

let printLogs = true;

function logStr(prefix, data) {
  if (typeof (data) === 'string') {
    return `${prefix} ${data}`;
  }
  return `${prefix} ${JSON.stringify(data)}`;
}

module.exports = {
  log: function log(value) {
    if (printLogs) {
      console.log(logStr(colors.grey('[INFO]'), value)); // eslint-disable-line
    }
  },

  title: function log(value) {
    if (printLogs) {
      console.log(logStr(colors.bgBlue(value),'')); // eslint-disable-line
    }
  },

  error: function error(value) {
    if (printLogs) {
      console.log(logStr(colors.bgRed('[ERROR]'), value)); // eslint-disable-line
    }
  },

  success: function error(value) {
    if (printLogs) {
      console.log(logStr(colors.bgGreen('[SUCCESS]'), value)); // eslint-disable-line
    }
  },

  warning: function warning(value) {
    if (printLogs) {
      console.log(logStr(colors.yellow('[WARNING]'), value)); // eslint-disable-line
    }
  },

  data: function data(value) {
    if (printLogs) {
      console.log(logStr(colors.black.bgCyan('[DATA]'), value)); // eslint-disable-line
    }
  },

  raw: function raw(value) {
    if (printLogs) {
      console.log(value); // eslint-disable-line
    }
  },

  errStr: function errStr(value) {
    return colors.bgRed('[ERROR]') + value;
  },

  successStr: function error(value) {
    if (printLogs) {
      return colors.bgGreen('[SUCCESS]') + value;
    }
    return value;
  }
};
