const asyncHandler = require('express-async-handler');
const Character = require('../models/Character');

const express = require('express');
const index = express.Router();

const cords = [];

index.get(
  '/characters',
  asyncHandler(async (req, res) => {
    const characters = await Character.find({}).sort({ name: -1 });

    if (!characters)
      return res.status(404).json({ error: 'Characters not found' });

    res.json({ characters });
  })
);

index.get('/coords', (req, res) => res.json({ cords }));

index.post('/validate', (req, res) => {
  cords.push(req.body.item);
  res.send('Success');
});

module.exports = index;
