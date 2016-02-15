'use strict';
var express = require('express');
var request = require("request");
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var router = express.Router();
var Beer = mongoose.model('Beer');
var BreweryDb = require("brewerydb-node");
var brewdb = new BreweryDb(process.env.brewdb_key);
var User = mongoose.model('User');
var auth = jwt({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});
router.get("/beer", function (req, res, next) {
    brewdb.search.beers({ q: req.query.name }, function (err, data) {
        res.send(data);
    });
});
router.get("/:id", function (req, res, next) {
    console.log();
    request("http://api.brewerydb.com/v2/beer/" + req.params.id + "/breweries?key=" + process.env.brewdb_key, function (err, response, body, data) {
        res.send(response.body);
    });
});
router.get('/', function (req, res, next) {
    Beer.find({})
        .populate('createdBy', 'username')
        .exec(function (err, beers) {
        if (err)
            return next(err);
        res.json(beers);
    });
});
router.get('/:id', function (req, res, next) {
    Beer.findOne({ _id: req.params.id })
        .populate('createdBy', 'username')
        .exec(function (err, beer) {
        res.send(beer);
    });
});
router.post('/', auth, function (req, res, next) {
    var newBeer = new Beer(req.body);
    newBeer.createdBy = req['payload']._id;
    newBeer.save(function (err, beer) {
        if (err)
            return next(err);
        User.update({ _id: req['payload']._id }, { $push: { 'beer': beer._id } }, function (err, results) {
            if (err)
                return next(err);
            res.send(beer);
        });
    });
});
router.delete('/', function (req, res, next) {
    if (!req.query._id)
        return next({ status: 404, });
    Beer.remove({ _id: req.query._id }, function (err, result) {
        res.send({ message: "Deleted." });
    });
});
module.exports = router;
