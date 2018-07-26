const mongoose = require('mongoose');
const { Schema } = mongoose;
const ExerciseSchema = require('./Exercise');

const userSchema = new Schema({
    username: String,
    exercise: [ExerciseSchema]
});

mongoose.model('users', userSchema);
