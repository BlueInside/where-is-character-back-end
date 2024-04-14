function validateCoords(x, y, character) {
  let isXCorrect = false;
  let isYCorrect = false;
  // Checks if x position is within range
  if (x >= character.xCoordinate.min && x <= character.xCoordinate.max)
    isXCorrect = true;
  // Checks if y position is within range
  if (y >= character.yCoordinate.min && y <= character.yCoordinate.max)
    isYCorrect = true;
  // Return true if both coords are within range
  return isXCorrect && isYCorrect;
}

module.exports = validateCoords;
