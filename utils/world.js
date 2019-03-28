const log = require('./logUtils.js');
const stringUtils = require('./stringUtils.js');
const objectUtils = require('./objectUtils.js');
const mergeObjects = require('deepmerge');

module.exports = function initializeWorld(worldObject, worldMap) {
  const world = worldObject;

  world.hasValue = function hasValue(key) {
    if (!objectUtils.recursiveHasOwnProperty(worldMap, key)) {
      throw new Error(`Key "${key}" is not declared in worldMap.js.`);
    }

    return (typeof (world.values[key]) !== 'undefined');
  };

  world.get = function get(key) {
    try {
      log.data(`get key: ${key}`);

      if (!objectUtils.recursiveHasOwnProperty(worldMap, key)) {
        throw new Error(`Key "${key}" is not declared in worldMap.js.`);
      }

      if (typeof world.values[key] === 'undefined') {
        throw new Error(`Key "${key}" not found.`);
      }

      log.data(`result: ${stringUtils.stringify(world.values[key])}`);

      return world.values[key];
    } catch (error) {
      throw new Error(`Error during get ${key} : ${error}`);
    }
  };

  world.set = function set(key, value) {
    try {
      let varString = stringUtils.stringify(value);
      varString = (varString.length > 100) ? `${varString.substring(0, 100)}...` : varString;

      log.data(`set value ${varString} in key ${key}`);

      if (!objectUtils.recursiveHasOwnProperty(worldMap, key)) {
        throw new Error(`Key "${key}" is not declared in world.js.`);
      }

      world.values[key] = value;
    } catch (error) {
      throw new Error(`Error during set ${key} : ${error}`);
    }
  };

  world.merge = function merge(key, values) {
    try {
      log.log(`merge value ${stringUtils.stringify(values)} with key ${key}`);

      if (!objectUtils.recursiveHasOwnProperty(worldMap, key)) {
        throw new Error(`Key "${key}" is not declared in world.js.`);
      }

      if (typeof world.values[key] === 'undefined') {
        world.values[key] = values;
        log.data(`result: ${stringUtils.stringify(world.values[key])}`);
        return;
      }

      const obj = world.values[key];
      const mergeObject = mergeObjects(obj, values);
      world.values[key] = mergeObject;
      log.data(`result: ${stringUtils.stringify(world.values[key])}`);
    } catch (error) {
      throw new Error(`Error during adding ${key} : ${error}`);
    }
  };

  world.values = {};
};
