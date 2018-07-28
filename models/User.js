const mongoose = require('mongoose');
const { Schema } = mongoose;
// const ExerciseSchema = require('./Exercise');

const userSchema = new Schema({
    username: String,
    count: { type: Number, default: 0 },
    logs: [
        {
            description: String,
            duration: Number,
            date: Date
        }
    ]
});

mongoose.model('users', userSchema);
