const index = require('./index');
const express = require('express');
const app = express();
const request = require('supertest');

app.use(express.urlencoded({ extended: false }));

app.use('/', index);

describe('GET /Characters', () => {
  test('route /characters return json with characters', (done) => {
    request(app)
      .get('/characters')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.characters).toHaveLength(3);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('POST /validate', () => {
  const userCharacterSelection = {
    name: 'Bugs',
    xCoordinate: 100,
    yCoordinate: 200,
  };

  test('should validate character selection', (done) => {
    request(app)
      .post('/validate')
      .type('form')
      .send(userCharacterSelection)
      .then((res) => {
        expect(res.body.message).toMatch(
          `That's right thats ${userCharacterSelection.name}`
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
