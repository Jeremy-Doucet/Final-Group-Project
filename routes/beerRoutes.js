'use strict';
var express = require('express');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var router = express.Router();
var Beer = mongoose.model('Beer');
var auth = jwt({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});
router.get('/', function (req, res, next) {
    Beer.find({})
        .exec(function (err, beers) {
        if (err)
            return next(err);
        res.json(beers);
    });
});
router.post('/', function (req, res, next) {
    var newBeer = new Beer(req.body);
    newBeer.save(function (err, beer) {
        if (err)
            return next(err);
        res.send(beer);
    });
});
module.exports = router;
