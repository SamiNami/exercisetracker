const mongoose = require('mongoose');
const { Schema } = mongoose;

const exerciseSchema = new Schema({
    _userId: String,
    description: String,
    duration: Number,
    date: Date
});

mongoose.model('exercises', exerciseSchema);
