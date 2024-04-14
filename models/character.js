const mongoose = require('mongoose');
const { Schema } = mongoose;

const coordinateSchema = new Schema(
  {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  { _id: false }
);

const characterSchema = new Schema({
  name: String,
  xCoordinate: coordinateSchema,
  yCoordinate: coordinateSchema,
});

module.exports = mongoose.model('Character', characterSchema);
