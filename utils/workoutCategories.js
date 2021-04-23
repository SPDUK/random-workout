const workoutCategories = [
  { title: 'full body', tags: ['full body'] },
  { title: 'hiit', tags: ['HIIT'] },
  { title: 'bodyweight', tags: ['bodyweight'] },
  { title: 'cardio', tags: ['cardio'] },
  { title: 'calisthenics', tags: ['calisthenics'] },
  { title: 'barbell curl', tags: ['biceps'] },
  { title: 'dumbbell curl', tags: ['biceps'] },
  { title: 'hammer curl', tags: ['biceps'] },
  { title: 'goblet curl', tags: ['biceps'] },
  { title: 'concentration curl', tags: ['biceps'] },
  { title: 'preacher curl', tags: ['biceps'] },
  { title: 'single arm curl', tags: ['biceps'] },
  {
    title: 'inverted row',
    tags: ['biceps', 'lats', 'forearms', 'traps (mid-back)'],
  },
  { title: 'chin-ups', tags: ['biceps', 'forearms'] },
  { title: 'barbell bench press', tags: ['chest'] },
  { title: 'dips', tags: ['chest', 'triceps'] },
  { title: 'incline dumbbell press', tags: ['chest'] },
  { title: 'dumbbell flys', tags: ['chest'] },
  { title: 'dumbbell bench press', tags: ['chest'] },
  { title: 'incline barbell bench press', tags: ['chest'] },
  { title: 'chest press', tags: ['chest'] },
  { title: 'single arm chest fly', tags: ['chest'] },
  { title: 'single arm press', tags: ['chest'] },
  { title: 'walkover pushup', tags: ['chest'] },
  { title: 'push up', tags: ['chest', 'triceps'] },
  { title: 'bench dips', tags: ['chest', 'triceps', 'triceps', 'shoulders'] },
  { title: 'incline push-up', tags: ['chest'] },
  { title: 'decline push-up', tags: ['chest', 'shoulders'] },
  { title: 'diamond push-ups', tags: ['chest', 'triceps'] },
  { title: 'squat', tags: ['quads', 'hamstrings', 'glutes'] },
  { title: 'leg press', tags: ['quads'] },
  { title: 'leg extension', tags: ['quads'] },
  { title: 'goblet squat', tags: ['quads', 'quads'] },
  { title: 'bulgarian split squat', tags: ['quads'] },
  { title: 'step up', tags: ['quads'] },
  { title: 'heels up goblet squat', tags: ['quads'] },
  { title: 'reverse lunge', tags: ['quads'] },
  { title: 'forward lunge', tags: ['quads'] },
  { title: 'lateral lunge', tags: ['quads'] },
  { title: 'side lunges', tags: ['quads', 'glutes'] },
  { title: 'forward lunges', tags: ['quads', 'glutes'] },
  { title: 'jump squats', tags: ['quads', 'glutes'] },
  { title: 'squats', tags: ['quads', 'glutes'] },
  { title: 'barbell curtsy lunge', tags: ['quads', 'glutes'] },
  { title: 'seated db shrugs', tags: ['traps'] },
  { title: 'standing smith machine shrugs', tags: ['traps'] },
  { title: 'shrug', tags: ['traps'] },
  { title: 'upright row', tags: ['traps'] },
  { title: 'kettlebell silverback shrug', tags: ['traps', 'traps (mid-back)'] },
  { title: 'incline shrug', tags: ['traps', 'traps (mid-back)'] },
  { title: 'elevated pike shoulder shrug', tags: ['traps', 'shoulders'] },
  {
    title: 'elevated pike press',
    tags: ['traps', 'triceps', 'shoulders', 'traps (mid-back)'],
  },
  { title: 'barbell silverback shrug', tags: ['traps'] },
  { title: 'dips (narrow elbows)', tags: ['triceps'] },
  { title: 'seated triceps extensions', tags: ['triceps'] },
  { title: 'cable push downs', tags: ['triceps'] },
  { title: 'laying triceps extensions', tags: ['triceps'] },
  { title: 'skull crusher', tags: ['triceps'] },
  { title: 'standing tricep extension', tags: ['triceps'] },
  { title: 'decline skull crusher', tags: ['triceps'] },
  { title: 'tate press', tags: ['triceps'] },
  { title: 'close grip bench press', tags: ['triceps'] },
  { title: 'side lateral raises', tags: ['shoulders'] },
  { title: 'bent-over rear delt fly', tags: ['shoulders'] },
  { title: 'face pulls', tags: ['shoulders'] },
  { title: 'seated dumbbell shoulder press', tags: ['shoulders'] },
  { title: 'front raises', tags: ['shoulders'] },
  { title: 'seated bent-over rear delt fly', tags: ['shoulders'] },
  { title: 'rear delt row', tags: ['shoulders'] },
  { title: 'front raise', tags: ['shoulders'] },
  { title: 'single arm rear delt fly', tags: ['shoulders'] },
  { title: 'long lever lateral raise', tags: ['shoulders'] },
  { title: 'single arm lateral raise', tags: ['shoulders'] },
  { title: 'barbell overhead press', tags: ['shoulders'] },
  { title: 'neutral grip pulldown', tags: ['lats'] },
  { title: 'seated cable row', tags: ['lats', 'traps (mid-back)'] },
  { title: 'pull ups', tags: ['lats', 'traps (mid-back)'] },
  { title: 'dumbbell row', tags: ['lats', 'traps (mid-back)'] },
  { title: 'bent over barbell row', tags: ['lats'] },
  { title: 'row', tags: ['lats', 'traps (mid-back)'] },
  { title: 'shoulder extension', tags: ['lats'] },
  { title: 'single arm row', tags: ['lats'] },
  { title: 'pullover', tags: ['lats'] },
  { title: 'stiff leg deadlifts', tags: ['hamstrings'] },
  { title: 'hamstring curl', tags: ['hamstrings'] },
  { title: 'ball hamstring curl', tags: ['hamstrings'] },
  { title: 'deadlift', tags: ['hamstrings', 'lower back', 'traps (mid-back)'] },
  { title: 'kettlebell swing', tags: ['hamstrings', 'lower back'] },
  { title: 'single leg deadlift', tags: ['hamstrings'] },
  { title: 'staggered deadlift', tags: ['hamstrings', 'lower back'] },
  { title: 'good mornings', tags: ['hamstrings', 'glutes', 'lower back'] },
  { title: 'kickbacks', tags: ['hamstrings'] },
  { title: 'single legged romanian deadlifts', tags: ['hamstrings'] },
  { title: 'nordic hamstring curl', tags: ['hamstrings'] },
  { title: 'glute bridge', tags: ['glutes', 'glutes'] },
  { title: 'barbell hip thrust', tags: ['glutes'] },
  { title: 'single leg glute bridge', tags: ['glutes', 'glutes'] },
  { title: 'hip thrust', tags: ['glutes'] },
  { title: 'single leg hip thrust', tags: ['glutes'] },
  { title: 'behind the back barbell wrist curl', tags: ['forearms'] },
  { title: 'wrist curl', tags: ['forearms'] },
  { title: 'reverse curl', tags: ['forearms'] },
  { title: 'barbell wrist curl', tags: ['forearms'] },
  { title: 'farmer’s carry', tags: ['forearms'] },
  { title: 'wrist extension', tags: ['forearms'] },
  { title: 'standing calf raises', tags: ['calves'] },
  { title: 'seated calf raises', tags: ['calves'] },
  { title: 'single leg calf raise', tags: ['calves'] },
  { title: 'calf raise', tags: ['calves'] },
  { title: 'seated calf raise', tags: ['calves'] },
  { title: 'tip toe walking', tags: ['calves'] },
  { title: 'calf raises', tags: ['calves'] },
  { title: 'walking calf raises', tags: ['calves'] },
  { title: 'barbell calf raises', tags: ['calves'] },
  { title: 'crunches', tags: ['abdominals'] },
  { title: 'laying leg raises', tags: ['abdominals'] },
  { title: 'leg raises', tags: ['abdominals'] },
  { title: 'roll-outs', tags: ['abdominals'] },
  { title: 'situp', tags: ['abdominals'] },
  { title: 'russian twist', tags: ['abdominals'] },
  { title: 'woodchopper', tags: ['abdominals'] },
  { title: 'windmill', tags: ['abdominals'] },
  { title: 'forearm plank', tags: ['abdominals'] },
  { title: 'hanging knee raises', tags: ['abdominals'] },
  { title: 'barbell roll-outs', tags: ['abdominals'] },
  { title: 'barbell landmine side bend', tags: ['abdominals'] },
  { title: '45° back extension', tags: ['lower back'] },
  { title: 'goblet good morning', tags: ['lower back'] },
  { title: 'supermans', tags: ['lower back'] },
];

module.exports = workoutCategories;
