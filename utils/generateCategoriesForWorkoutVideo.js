const Fuse = require('fuse.js');
const commonWords = require('./commonWords');
const workoutCategories = require('./workoutCategories');

const options = {
  includeScore: true,
  keys: ['title', 'tags'],
};

const fuse = new Fuse(workoutCategories, options);

function generateCategoriesForWorkoutVideo(title, description) {
  const workoutWords = `${title} ${description}`
    .replace(/[^a-zA-Z\s]/gi, ' ')
    .split(' ')
    .filter(Boolean)
    .map((x) => x.toLowerCase())
    .filter((s) => !commonWords.has(s));

  const result = workoutWords.reduce((acc, cur) => {
    // destructure top result
    const [search] = fuse.search(cur);
    if (!search) return acc;

    // asume the match is not good enough
    if (search.score > 0.3) return acc;

    console.log(search);

    const tags = search?.item?.tags;
    // sanity check for tags actually existing
    if (!tags) return acc;

    const newAccSet = new Set(acc);

    tags.forEach((tag) => newAccSet.add(tag));

    return newAccSet;
  }, new Set());

  // return as array for mongodb
  return [...result];
}

module.exports = generateCategoriesForWorkoutVideo;
