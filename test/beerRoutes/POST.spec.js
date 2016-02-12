"use strict";
let should = require('should');
let mongoose = require('mongoose');
let request = require('supertest');

let app = require('../../server');
let Beer = mongoose.model('Beer');
let User = mongoose.model('User');

describe('-- Beer Routes --', () => {
  let id;
  let authHeader;
  before((done) => {
    let u = new User();
    u.username = "beerUser";
    u.email = "aa@beer.com";
    u.setPassword('secret');
    u.save((err, user) =>{
      // console.log(err)
      let beer = new Beer();
      beer.title = "Sample Title";
      beer.author = "Sample Author";
      beer.save((err) => {
        authHeader = `Bearer ${user.generateJWT()}`;
        id = beer._id.toString();
        user.save();
        done();
      });
    });
  });

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
        .set('Authorization', authHeader)
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
