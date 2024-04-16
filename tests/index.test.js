const index = require('./index');
const express = require('express');
const app = express();
const request = require('supertest');
const mockSession = require('./mockSession');

app.use(express.urlencoded({ extended: false }));

app.use('/', index);

beforeEach(() => {
  userCharacterSelection = {
    name: 'Bugs',
    xCoordinate: 100,
    yCoordinate: 200,
  };
});

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
  let userCharacterSelection = {
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

  test('should return error when payload is not correct', (done) => {
    userCharacterSelection = { name: 'Wrong name' };
    request(app)
      .post('/validate')
      .type('form')
      .send(userCharacterSelection)
      .then((res) => {
        expect(res.body.message).toBeUndefined();
        expect(res.body.error).toMatch(/Missing required fields/i);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('should return correct message when user clicks on wrong character', (done) => {
    userCharacterSelection = {
      name: 'Bugs',
      xCoordinate: 99,
      yCoordinate: 199,
    };
    request(app)
      .post('/validate')
      .type('form')
      .send(userCharacterSelection)
      .then((res) => {
        expect(res.body.message).toMatch(
          `Sorry that's not quite ${userCharacterSelection.name}`
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('GET /level1', () => {
  beforeEach(() => {
    mockSession.reset();
  });
  test('Should change add the timeStart to mockSession', (done) => {
    request(app)
      .get('/level1')
      .expect(200)
      .then(() => {
        expect(mockSession.startTime).toBeDefined();
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe('GET /result', () => {
  beforeEach(() => {
    mockSession.reset();
  });
  test('Should add TimeStop and score to mockSession', (done) => {
    request(app)
      .get('/result')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(() => {
        expect(mockSession.finishTime).toBeDefined();
        expect(mockSession.score).toBeDefined();
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
