"use strict";
let should = require('should');
let mongoose = require('mongoose');
let request = require('supertest');

let app = require('../../server');
let Beer = mongoose.model('Beer');
// let User = mongoose.model('User');

describe('-- Beer Routes --', () => {
  let authHeader;
  describe('POST /api/v1/beer', () => {
    it('Should return a 401 without an auth header', (done) => {
      var b = {
        name: 'name',
        brewery: 'brewery',
        type: 'type',
        location: 'location'
      };
      request(app)
        .post('/api/v1/beer')
        .send(b)
        .expect(401)
        .end(done);
    });
    it('Should return a 500 with no body', (done) => {
      request(app)
        .post('/api/v1/beer')
        .set('Authorization', authHeader)
        .expect(500)
        .end(done);
    })
  })
})
