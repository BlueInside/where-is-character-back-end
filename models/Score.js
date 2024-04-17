const mongoose = require('mongoose');
const { Schema } = mongoose;

const scoreSchema = new Schema({
  name: { type: String, default: 'Anonymous' },
  score: { type: String, required: true },
});

module.exports = mongoose.model('Score', scoreSchema);
