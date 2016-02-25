"use strict";
process.env.NODE_ENV='test';
let should = require('should');
let mongoose = require('mongoose');
let request = require('supertest');

let app = require('../../server');
let Beer = mongoose.model('Beer');
// let User = mongoose.model('User');

describe('--Beer GET Routes--', ()=>{
  let id;
  before((done)=>{
    let beer = new Beer();
    beer.name = "Name of Beer";
    beer.type = "Type of Beer";
    beer.location = "location";
    beer.imgurl = "Beer Image";
    beer.review = "Review of Beer"
    beer.save((err) =>{
      id = beer._id.toString();
      done();
    });
  });

  describe('GET /api/v1/beer', ()=>{
    it('Should return a status of 200', (done)=>{
      request(app)
        .get('/api/v1/beer')
        .expect(200)
        .end(done)
    });

    it('Should return an array with 1 beer', (done)=>{
      request(app)
        .get('/api/v1/beer')
        .expect(200)
        .expect((res)=>{
          should.exist(res.body);
          should.not.exist(res.body[1]);
          res.body[0].type.should.equal("Type of Beer");
        })
        .end(done);
    })
  });
})
