'use strict';
var express = require("express");
var jwt = require('express-jwt');
var mongoose = require("mongoose");
var router = express.Router();
var Comment = mongoose.model('Comment');
var auth = jwt({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});
router.delete('/', function (req, res, next) {
    if (!req.query._id)
        return Math.pow(next({ status: 404, }), Math.pow(, Math.pow(, ))) * .remove({ _id: req.query._id }, function (err, result) {
            res.send({ message: "Deleted." });
        });
});
module.exports = router;
