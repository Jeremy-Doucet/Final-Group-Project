'use strict';
var express = require('express');
var request = require("request");
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var router = express.Router();
var Beer = mongoose.model('Beer');
var BreweryDb = require("brewerydb-node");
var brewdb = new BreweryDb(process.env.brewdb_key);
var User = mongoose.model('User');
var auth = jwt({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});
router.get('/details/:id', function (req, res, next) {
    Beer.findOne({ _id: req.params.id })
        .populate('createdBy', 'username')
        .populate('comments')
        .exec(function (err, beer) {
        Comment.populate(beer.comments, { path: "createdBy", select: "username" }, function (err, result) {
            res.send(beer);
        });
    });
});
router.post('/addBeer', auth, function (req, res, next) {
    console.log(req.body);
    var newBeer = new Beer(req.body);
    newBeer.createdBy = req['payload']._id;
    newBeer.save(function (err, beer) {
        if (err)
            return next(err);
        User.update({ _id: req['payload']._id }, { $push: { 'beers': beer._id } }, function (err, results) {
            if (err)
                return next(err);
            res.send(beer);
        });
    });
});
router.put('/details/:_id', function (req, res, next) {
    Beer.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, function (err, result) {
        if (err)
            return next(err);
        if (!result)
            return next({ message: 'Could not find and update the beer.' });
        res.send(result);
    });
});
router.delete('/details/:_id', function (req, res, next) {
    if (!req.query._id)
        return next({ status: 404, message: 'Please include an ID' });
    Beer.remove({ _id: req.query._id }, function (err, result) {
        res.send({ message: "Successfully deleted beer" });
    });
});
router.get("/breweryDetails/:id", function (req, res, next) {
    console.log();
    request("http://api.brewerydb.com/v2/beer/" + req.params.id + "/breweries?key=" + process.env.brewdb_key, function (err, response, body, data) {
        res.send(response.body);
    });
});
router.get("/searchBeer", function (req, res, next) {
    brewdb.search.beers({ q: req.query.name }, function (err, data) {
        res.send(data);
    });
});
module.exports = router;
