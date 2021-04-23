const generateCategoriesForWorkoutVideo = require('../generateCategoriesForWorkoutVideo');

test('finds HIIT and cardio', () => {
  const title =
    'BURN 300 CALORIES with this 20 Minute Cardio Workout! / No Equipment At Home HIIT Cardio';

  const desc =
    'In this video, Eryka of TG Fitness takes you through a 20 minute follow along cardio workout for women with the best no equipment exercises to burn fat and lose weight in 20 minutes at home....';

  const categories = generateCategoriesForWorkoutVideo(title, desc);
  expect(
    ['HIIT', 'cardio'].every((cat) => categories.includes(cat))
  ).toBeTruthy();
});

test('finds abdominals as only category', () => {
  const title = 'Get a “6 Pack” in 22 Days! (HOME AB WORKOUT)';

  const desc =
    'If you want to get a 6 pack at home and are not sure what home ab workout to do, give this one a try. This workout is designed to do two things in just 22 days...';

  const categories = generateCategoriesForWorkoutVideo(title, desc);
  expect(['abdominals'].every((cat) => categories.includes(cat))).toBeTruthy();
});
