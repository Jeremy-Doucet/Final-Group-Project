

'use strict';

let should = require('should');
let mongoose = require('mongoose');
let request = require('supertest');

let app = require('../server');
let Comments = mongoose.model('Comments');

describe('GET /Comments', () => {
  it('Should return a status of 200', (done) => {
    request(app)
      .get('/Comments')
      // checking the status code
      .expect(200)
      .end(done);
  });
  it('Should return an array with 1 comment in it', (done) => {
    request(app)
      .get('/Comments')
      .expect(200)
      .expect((res) => {
        should.exist(res.body);
        res.body.length.should.equal(1);
      })
      .end(done);
  });
});