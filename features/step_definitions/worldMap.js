// Map of the cucumber world

let worldObject = {
  gitUrl: undefined,
  gitSubUrl: undefined,
};


const setKeys = function setKeys(world, key) {
  const worldObj = world;
  const properties = Object.keys(worldObj);
  for (let property = 0; property < properties.length; property += 1) {
    const value = key ? `${key}.${properties[property]}` : properties[property];
    if (worldObj[properties[property]] === undefined) {
      worldObj[properties[property]] = value;
    } else {
      setKeys(worldObj[properties[property]], value);
    }
  }
  return worldObj;
};

worldObject = setKeys(worldObject);

module.exports = worldObject;
