'use strict';

let should = require('should');
let mongoose = require('mongoose');
let request = require('supertest');

let app = require('../../server');
let Beer = mongoose.model('Beer');

////////////////////////
///GET: by location
////////////////////////

describe("/catshell/byLocation/:location", function() {

  before(function(done) {
    let id;
    let beerLocal = new Beer();
    beerLocal.name = "name";
    beerLocal.type = "type";
    beerLocal.location = "location";
    beerLocal.imgurl = "image";
    beerLocal.review = "review";
    beerLocal.save((error) => {
      id = beerLocal._id.toString();
      done();
    });
  });

  describe("/catshell/byLocation/:location", function() {

    it("should return 200, empty array if no beersLocal found", function(done) {
      request(app)
      .get("/catshell/byLocation/nosuchplace")
      .expect(200)
      .expect(function(res) {
        should.not.exist(res.body[0]);
      })
      .end(done);
    });

    it("should return 200, array of 1 beersLocal found", function(done) {
      request(app)
      .get("/catshell/byLocation/location")
      .expect(200)
      .expect(function(res) {
        should.not.exist(res.body[1]);
        res.body[0].location.should.equal("location");
      })
      .end(done);
    });
  });
});

////////////////////////
///GET: by type
////////////////////////
