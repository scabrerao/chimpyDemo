/**
 * Utilities for processing the objects.
 */

module.exports = {
  recursiveHasOwnProperty: function getUniqueName(object, key) {
    let activeObject = object;
    return !key.split('.').some(function isObjectHasProperty(item) {
      if (!Object.prototype.hasOwnProperty.call(activeObject, item)) {
        return true;
      }

      activeObject = activeObject[item];
      return false;
    });
  },

  setNestedValue: function getUniqueName(key, value) {
    const object = {};
    let activeObject = object;
    key.split('.').forEach(function setObjectValue(item, index, array) {
      if (index === array.length - 1) {
        activeObject[item] = value;
      } else {
        activeObject[item] = {};
      }

      activeObject = activeObject[item];
    });

    return object;
  },

};
