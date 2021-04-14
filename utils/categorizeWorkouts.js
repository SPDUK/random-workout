const fs = require('fs');
const path = require('path');

function buildCategories() {
  const workouts = fs
    .readFileSync(path.resolve(__dirname, './workouts.txt'), 'utf-8')
    .split('\n')
    .map((x) => x.trim());

  let lastCategory = '';

  const categories = workouts.reduce((acc, workoutName) => {
    const workout = workoutName.toLowerCase();

    // create the category key and return early
    if (workout.startsWith('*')) {
      const category = workout.replace('*', '');

      lastCategory = category;
      return acc;
    }

    const existingWorkoutIdx = acc.findIndex(({ title }) => title === workout);

    if (existingWorkoutIdx > -1) {
      const updatedAcc = acc.map((curWorkout, idx) => {
        if (idx === existingWorkoutIdx) {
          return { ...curWorkout, tags: [...curWorkout.tags, lastCategory] };
        }
        return curWorkout;
      });

      return updatedAcc;
    }

    const structuredWorkout = {
      title: workout,
      tags: [lastCategory],
    };

    return [...acc, structuredWorkout];
  }, []);

  return categories;
}

module.exports = buildCategories;
