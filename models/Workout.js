const mongoose = require('mongoose');

const { Schema } = mongoose;

const workoutSchema = new Schema({
  channelName: { type: String },
  subCount: { type: String, required: true },
  imageLink: { type: String },
  href: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: Number, required: true },
});

const Workout = mongoose.model('workout', workoutSchema);

module.exports = Workout;
