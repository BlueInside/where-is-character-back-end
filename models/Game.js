const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    startTime: Date,
    endTime: Date,
    duration: Number,
});

module.exports = mongoose.model('Game', gameSchema)