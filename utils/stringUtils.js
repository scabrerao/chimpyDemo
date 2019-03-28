/**
 * Utilities for processing the strings.
 * Holds all the commonly used string transformations.
 */

const uuid = require('uuid');
const moment = require('moment');

module.exports = {
  stringify(value) {
    if (Array.isArray(value)) {
      return `[${value}]`;
    } else if (typeof (value) === 'object') {
      return JSON.stringify(value);
    }

    return value;
  },
};
