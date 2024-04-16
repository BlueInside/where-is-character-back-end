const asyncHandler = require('express-async-handler');
const express = require('express');
const index = express.Router();
const validateCoords = require('../utils/validateCoordinates');
const mockSession = require('./mockSession');
const mockCharacters = [
  {
    name: 'Bugs',
    xCoordinate: { min: 100, max: 200 },
    yCoordinate: { min: 100, max: 200 },
  },
  {
    name: 'Ed',
    xCoordinate: { min: 100, max: 200 },
    yCoordinate: { min: 100, max: 200 },
  },
  {
    name: 'Donald',
    xCoordinate: { min: 100, max: 200 },
    yCoordinate: { min: 100, max: 200 },
  },
];

const mockScores = [
  {
    name: 'janes',
    score: '02:03',
  },
  {
    name: 'blake',
    score: '01:03',
  },
  {
    name: 'levi',
    score: '04:03',
  },
];
index.get(
  '/characters',
  asyncHandler(async (req, res) => {
    // gets all characters from database
    const characters = mockCharacters;

    if (!characters) {
      return res.status(404).json({ error: 'Character not found' });
    }

    res.status(200).json({ characters: characters });
  })
);

index.get('/level1', (req, res) => {
  mockSession.startTime = Date.now();

  res.status(200).json({});
});

index.get('/result', (req, res) => {
  mockSession.finishTime = Date.now();

  mockSession.score = mockSession.startTime - mockSession.finishTime;
  // gets scores from DB
  let scores = mockScores;

  // filter scores by the time from shortest to longest
  let filteredScores = scores.sort(); // REMEMBER js sorts numbers differently

  res.status(200).json({ scores: filteredScores });
});

index.post(
  '/validate',
  asyncHandler(async (req, res) => {
    // Destruct payload
    const { name, xCoordinate, yCoordinate } = req.body;

    // Checks if all fields were sent
    if (!name || !xCoordinate || !yCoordinate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Find character in DB based on that name
    const character = mockCharacters.find(
      (character) => character.name == name
    );

    if (!character)
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
