'use strict';

let should = require('should');
let mongoose = require('mongoose');
let request = require('supertest');

let app = require('../../server');
let Comment = mongoose.model('Comment');
let User = mongoose.model('User');

describe('GET /comments', () => {
  it('should return a status of 200', (done) => {
    request(app)
      .get('/comments')
      // checking the status code
      .expect(200)
      .end(done);
  });
  it('should return an array with 1 comment in it', (done) => {
    request(app)
      .get('/comments')
      .expect(200)
      .expect((res) => {
        should.exist(res.body);
        res.body.length.should.equal(1);
      })
      .end(done);
  });
});
