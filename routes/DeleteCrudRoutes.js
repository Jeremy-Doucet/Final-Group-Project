'use strict';
var express = require("express");
var jwt = require('express-jwt');
var mongoose = require("mongoose");
var router = express.Router();
var Comment = mongoose.model('Comment');
var Beer = mongoose.model('Beer');
var auth = jwt({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});
module.exports = router;
