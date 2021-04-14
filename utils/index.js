const Fuse = require('fuse.js');
const workoutCategories = require('./workoutCategories');

const allObjectKeysHaveValues = (obj) => Object.values(obj).every(Boolean);

const options = {
  includeScore: true,
  keys: ['title', 'tags'],
};

const fuse = new Fuse(workoutCategories, options);

const workoutWords = '20 Min BICEP WORKOUT with DUMBBELLS at Home | Caroline Girvan'
  .split(' ')
  .map((x) => x.toLowerCase());

const result = workoutWords.reduce((acc, cur) => {
  const [search] = fuse.search(cur);

  console.log({
    score: search?.score,
    title: search?.item.title,
    tags: search?.item.tags,
    wordToMatch: cur,
  });
}, []);
console.log({ result });

module.exports = {
  allObjectKeysHaveValues,
  workoutCategories,
};
