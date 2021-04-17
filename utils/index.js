const workoutCategories = require('./workoutCategories');

const allObjectKeysHaveValues = (obj) => Object.values(obj).every(Boolean);

module.exports = {
  allObjectKeysHaveValues,
  workoutCategories,
};
