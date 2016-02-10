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
    it('Should return a 500 because no auth header with post to authorize', (done) => {
      var b = {
        name: 'name',
        brewery: 'brewery',
        type: 'type',
        location: 'location'
      };
      request(app)
        .post('/api/v1/beer')
        .send(b)
        .expect(500)
        .end(done);
    });
    it('Should return a 500 with no body', (done) => {
      request(app)
        .post('/api/v1/beer')
        .expect(500)
        .end(done);
    });
    it('Should return a 200 with beer object back', (done) => {
      var b = {
        name: 'name',
        type: 'type',
        location: 'location',
        imgurl: 'bigbooty.jpg',
        review: 'good beer'
      };
      request(app)
        .post('/api/v1/beer')
        .send(b)
        .expect(200)
        .expect((res) => {
          should.exist(res.body);
          should.exist(res.body._id);
          res.body.name.should.equal('name');
          res.body.type.should.equal('type');
          res.body.location.should.equal('location');
          res.body.imgurl.should.equal('bigbooty.jpg');
          res.body.review.should.equal('good beer');
        })
        .end(done);
    });
  })
})
