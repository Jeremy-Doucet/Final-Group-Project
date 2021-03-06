'use strict';
process.env.NODE_ENV='test';
let server = require('../server');
let async = require('async');
let mongoose = require('mongoose');
let Beer = mongoose.model('Beer');
let User = mongoose.model('User');
let Comment = mongoose.model("Comment");

before((done)=>{
  async.parallel([
    (cb) => {
      Beer.collection.remove(cb);
    }, (cb) => {
      User.collection.remove(cb);
    }
  ], done);
});
