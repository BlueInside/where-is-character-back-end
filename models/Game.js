const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    startTime: Date,
    endTime: Date,
    duration: Number,
});

module.exports = mongoose.model('Game', gameSchema)