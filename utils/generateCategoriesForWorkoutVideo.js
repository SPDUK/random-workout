const Fuse = require('fuse.js');
const { uniq } = require('ramda');
const commonWords = require('./commonWords');
const workoutCategories = require('./workoutCategories');

const options = {
  includeScore: true,
  keys: ['title', 'tags'],
};

const fuse = new Fuse(workoutCategories, options);

function generateCategoriesForWorkoutVideo(title, description) {
  // just incase something goes very wrong
  if (!title || !description) return [];

  const workoutWords = `${title} ${description}`
    .replace(/[^a-zA-Z\s]/gi, ' ')
    .split(' ')
    .filter(Boolean)
    .map((x) => x.toLowerCase())
    .filter((s) => !commonWords.has(s));

  const result = [];
  for (const word of workoutWords) {
    // destructure top result
    const [search] = fuse.search(word);

    // assume the match is good
    if (search?.score < 0.1) {
      const tags = search?.item?.tags;
      // sanity check for tags actually existing
      if (tags) {
        for (const tag of tags) {
          result.push({ tag, score: search.score });
        }
      }
    }
  }

  const onlyThreeClosestResults = uniq(
    [...result].sort((a, b) => a.score - b.score).map(({ tag }) => tag)
  );

  // return as array for mongodb
  return onlyThreeClosestResults;
}

module.exports = generateCategoriesForWorkoutVideo;
