const asyncHandler = require('express-async-handler');

const express = require('express');
const index = express.Router();

const mockCharacters = [
  {
    name: 'test1',
    xCoordinate: { min: 100, max: 200 },
    YCoordinate: { min: 100, max: 200 },
  },
  {
    name: 'test2',
    xCoordinate: { min: 100, max: 200 },
    YCoordinate: { min: 100, max: 200 },
  },
  {
    name: 'test3',
    xCoordinate: { min: 100, max: 200 },
    YCoordinate: { min: 100, max: 200 },
  },
];

index.get(
  '/characters',
  asyncHandler(async (req, res) => {
    // gets all characters from database
    const characters = mockCharacters;

    if (!characters) {
      return res.status(404).json({ error: 'Characters not found' });
    }

    res.status(200).json({ characters: characters });
  })
);

index.post();

module.exports = index;
