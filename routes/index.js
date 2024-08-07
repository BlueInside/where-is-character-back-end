const asyncHandler = require('express-async-handler');
const path = require('path');
const Character = require('../models/Character');
const Score = require('../models/Score');
const express = require('express');
const index = express.Router();
const { format } = require('date-fns');
const validateCoords = require('../utils/validateCoordinates');
const { body, validationResult } = require('express-validator');

index.get('/', (req, res) => {
  return res
    .status(200)
    .json({ message: 'Welcome to the where is character API ' });
});

index.get(
  '/characters',
  asyncHandler(async (req, res) => {
    const characters = await Character.find({}).sort({ name: -1 });

    if (!characters || characters.length === 0)
      return res.status(404).json({ error: 'Characters not found' });

    return res.status(200).json({ characters: characters });
  })
);

index.get('/start', (req, res) => {
  req.session.startTime = Date.now();
  return res.status(200).json({ message: 'Timer started' })
})

index.get(
  '/results',
  asyncHandler(async (req, res) => {
    if (!req.session.startTime) {
      return res
        .status(400)
        .json({ message: 'theres was no start time recorded' });
    }

    req.session.finishTime = Date.now();
    const { startTime, finishTime } = req.session;
    let score = finishTime - startTime;
    score = format(score, 'mm:ss');

    req.session.score = score;
    // gets scores from DB and sort
    const scores = await Score.find({}).sort({ score: 1 }).limit(10).exec();

    return res.status(200).json({ scores: scores, playerScore: score });
  })
);

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

index.post('/scores', [
  body('name')
    .trim()
    .isLength({ min: 1, max: 7 })
    .withMessage('Name must be at 1-7 characters long')
    .escape(),

  asyncHandler(async (req, res) => {
    // Validate
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    // Add score to the DB
    const score = req.session.score;

    if (!score)
      return res
        .status(400)
        .json({ message: 'Sorry there is no recorded score' });

    const createdScore = await Score.create({
      name: req.body.name,
      score: score,
    });

    // Get Updated scoreboard from DB
    const scores = await Score.find({}).sort({ score: 1 }).limit(10).exec();

    return res.status(200).json({ scores: scores });
  }),
]);

module.exports = index;
