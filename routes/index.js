const express = require('express');
const index = express.Router();

const cords = [];

index.get('/', (req, res) => {
  res.json({ character: 'Karol' });
});

index.get('/coords', (req, res) => res.json({ cords }));

index.post('/validate', (req, res) => {
  arrayBuffer.push(req.body.item);
  res.send('Success');
});

module.exports = index;
