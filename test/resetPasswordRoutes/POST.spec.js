'use strict';

let should = require('should');
let mongoose = require('mongoose');
let request = require('supertest');

let app = require('../../server');
let user = mongoose.model('user');

describe("/forgot", function() {
  it("should return 880 if Email === existing Email", function(done) {
    let Email = {
      email: "liltenichi@gmail.com"
    };
    request(app)
    .post("/forgot")
    .expect(880)
    .end(done);
  });
});
