const mongoose = require('mongoose');

const { Schema } = mongoose;

const workoutSchema = new Schema({
  channelName: { type: String },
  subCount: { type: String, required: true },
  imageLink: { type: String },
  href: { type: String, required: true, unique: true },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: { type: String },
  duration: { type: Number, required: true },
});

workoutSchema.index({ title: 'text' });

const Workout = mongoose.model('workout', workoutSchema);

module.exports = Workout;
