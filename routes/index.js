const asyncHandler = require('express-async-handler');
const Character = require('../models/Character');

const express = require('express');
const index = express.Router();

index.get(
  '/characters',
  asyncHandler(async (req, res) => {
    const characters = await Character.find({}).sort({ name: -1 });

    if (!characters || characters.length === 0)
      return res.status(404).json({ error: 'Characters not found' });

    res.status(200).json({ characters: characters });
  })
);

index.get('/coords', (req, res) => res.json({ cords }));

index.post('/validate', (req, res) => {});

module.exports = index;
