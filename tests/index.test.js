const index = require('./index');

const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use('/', index);

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

test('POST /validate', (done) => {
  request(app)
    .post('/validate')
    .send({ name: 'test1', xCoordinate: 100, yCoordinate: 200 })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((res) => {
      expect(res.body.message).toBeDefined();
      done();
    })
    .catch((err) => {
      done(err);
    });
});
