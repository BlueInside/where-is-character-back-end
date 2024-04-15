const asyncHandler = require('express-async-handler');
const path = require('path');
const Character = require('../models/Character');
const express = require('express');
const index = express.Router();

const validateCoords = require('../utils/validateCoordinates');

index.get(
  '/characters',
  asyncHandler(async (req, res) => {
    const characters = await Character.find({}).sort({ name: -1 });

    if (!characters || characters.length === 0)
      return res.status(404).json({ error: 'Characters not found' });

    res.status(200).json({ characters: characters });
  })
);

index.get('/level1', (req, res) => {
  const imagePath = path.join(__dirname, '..', 'public/level1.jpeg');
  req.session.startTime = Date.now();
  res.sendFile(imagePath);
});

index.post(
  '/validate',
  asyncHandler(async (req, res) => {
    console.log(req.session.startTime);
    // Destruct payload
    const { name, xCoordinate, yCoordinate } = req.body;

    // Checks if all fields were sent
    if (!name || !xCoordinate || !yCoordinate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Find character in DB based on that name
    const character = await Character.findOne({ name: name });

    if (!character || character.length === 0)
      return res.status(404).json({ error: 'Character not found' });

    // Check if coords are right
    const correctMatch = validateCoords(xCoordinate, yCoordinate, character);

    if (!correctMatch)
      return res
        .status(200)
        .json({ message: `Sorry that's not quite ${character.name}` });

    return res
      .status(200)
      .json({ message: `That's right thats ${character.name}` });
  })
);

module.exports = index;
