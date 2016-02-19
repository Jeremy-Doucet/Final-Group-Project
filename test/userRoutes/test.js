'use strict';

let should = require('should');
let mongoose = require('mongoose');
let request = require('supertest');

let app = require('../../server');
let User = mongoose.model('User');

////////////////////////
///register: no newUser object sent
////////////////////////

describe("/register", function() {
  it("should return 500 if no newUser object sent", function(done) {
    request(app)
    .post("/usershell/register")
    .expect(500)
    .end(done);
  });
});

////////////////////////
///register: no username entered
////////////////////////

describe("/register", function() {
  it("should return 500 if no newUser.username", function(done) {
    let newUser = {
      email: "aaa@email.com",
      password: "aaa"
    };
    request(app)
    .post("/usershell/register")
    .expect(500)
    .end(done);
  });
});

////////////////////////
///register: no email entered
////////////////////////

describe("/register", function() {
  it("should return 500 if no newUser.email", function(done) {
    let newUser = {
      username: "aaa",
      password: "aaa"
    };
    request(app)
    .post("/usershell/register")
    .expect(500)
    .end(done);
  });
});

////////////////////////
///register: no password entered
////////////////////////

describe("/register", function() {
  it("should return 500 if no newUser.password", function(done) {
    let newUser = {
      username: "aaa",
      email: "aaa@email.com"
    };
    request(app)
    .post("/usershell/register")
    .expect(500)
    .end(done);
  });
});

////////////////////////
///register: desired username already taken
////////////////////////

describe("/register", function() {
  it("should return 500 if newUser.username === existing user.username", function(done) {
    let newUser = {
      username: "aaa",
      email: "bbb@email.com",
      password: "bbb"
    };
    request(app)
    .post("/usershell/register")
    .expect(500)
    .end(done);
  });
});

////////////////////////
///register: email associated with existing user
////////////////////////

describe("/register", function() {
  it("should return 500 if newUser.email === existing user.email", function(done) {
    let newUser = {
      username: "ccc",
      email: "aaa@email.com",
      password: "ccc"
    };
    request(app)
    .post("/usershell/register")
    .expect(500)
    .end(done);
  });
});

////////////////////////
///register: save newUser
////////////////////////

describe("/register", function() {
  it("should return 200, user object if newUser saved", function(done) {
    let newUser = {
      username: "ddd",
      email: "ddd@email.com",
      password: "ddd"
    };
    request(app)
    .post("/usershell/register")
    .send(newUser)
    .expect(200)
    .expect(function(res) {
      should.exist(res.body.token);
    })
    .end(done);
  });
});

////////////////////////
///login: no username entered
////////////////////////

describe("/login", function() {
  it("should return 500 if no user.username", function(done) {
    let user = {
      password: "ddd"
    };
    request(app)
    .post("/usershell/login")
    .expect(500)
    .end(done);
  });
});

////////////////////////
///login: no password entered
////////////////////////

describe("/login", function() {
  it("should return 500 if no user.password", function(done) {
    let user = {
      username: "ddd"
    };
    request(app)
    .post("/usershell/login")
    .expect(500)
    .end(done);
  });
});

////////////////////////
///login: invalid username entered
////////////////////////

describe("/login", function() {
  it("should return 500 if invalid user.username", function(done) {
    let user = {
      username: "eee",
      password: "eee"
    };
    request(app)
    .post("/usershell/login")
    .expect(500)
    .end(done);
  });
});

////////////////////////
///login: invalid password entered
////////////////////////

describe("/login", function() {
  it("should return 500 if invalid user.password", function(done) {
    let user = {
      username: "fff",
      password: "fff"
    };
    request(app)
    .post("/usershell/login")
    .expect(500)
    .end(done);
  });
});

////////////////////////
///login: valid login
////////////////////////

describe("/login", function() {
  it("should return 200, token if valid login", function(done) {
    let user = {
      username: "ddd",
      password: "ddd"
    };
    request(app)
    .post("/usershell/login")
    .send(user)
    .expect(200)
    .expect(function(res) {
      should.exist(res.body.token);
    })
    .end(done);
  });
});
