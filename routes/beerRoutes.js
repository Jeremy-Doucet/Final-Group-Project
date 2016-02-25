'use strict';
var request = require('request');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Beer = mongoose.model('Beer');
var BreweryDb = require("brewerydb-node");
var BreweryDb = require('brewerydb-node');
var User = mongoose.model('User');
var auth = jwt({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});
router.get('/details/:id', function (req, res, next) {
    populate("createdBy", "username")
        .populate('createdBy', 'username avatarUrl')
        .populate('comments');
    res.send(beers);
    Comment.populate(beer.comments, { path: "createdBy", select: "username avatarUrl" }, function (err, result) {
        res.send(beer);
    });
    router.get('/details/:id', function (req, res, next) {
        router.get('/', function (req, res, next) {
            Beer.find({})
                .populate('createdBy', 'username')
                .exec(function (err, beers) {
                if (err)
                    return next(err);
                res.json(beers);
            });
            router.get("/beer", function (req, res, next) {
                router.get('/userHomeBeers', auth, function (req, res, next) {
                    Beer.find({ createdBy: req['payload']._id })
                        .exec(function (err, beers) {
                        if (err)
                            return next(err);
                        res.json(beers);
                    });
                    router.get('/userBeers/:id', auth, function (req, res, next) {
                        Beer.find({ createdBy: req.params.id })
                            .exec(function (err, beers) {
                            if (err)
                                return next(err);
                            res.json(beers);
                        });
                    });
                });
                router.get('/', function (req, res, next) {
                    Beer.find({});
                    newBeer.save(function (err, beer) {
                        exec(function (err, beers) {
                            User.update({ _id: req['payload']._id }, { $push: { 'beers': beer._id } }, function (err, results) {
                                console.log('saved beer to user');
                            });
                        });
                        router.post('/', auth, function (req, res, next) {
                            console.log(req.body);
                            var newBeer = new Beer(req.body);
                            newBeer.createdBy = req['payload']._id;
                            Beer.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, function (err, result) {
                                if (err)
                                    return next(err);
                                if (!result)
                                    return next({ message: 'Could not find and update the beer.' });
                                if (err)
                                    return next(err);
                            });
                        });
                    });
                });
                router.delete('/', function (req, res, next) {
                    if (!req.query._id)
                        return next({ status: 404 });
                    router.put('/:_id', function (req, res, next) {
                        Beer.remove({ _id: req.query._id }, function (err, result) {
                            res.send({ message: 'Deleted.' });
                        });
                    });
                    router.get('/userHomeBeers', auth, function (req, res, next) {
                        Beer.find({ createdBy: req['payload']._id })
                            .exec(function (err, beers) {
                            if (err)
                                return next(err);
                            res.json(beers);
                        });
                    });
                    router.get('/userBeers/:id', auth, function (req, res, next) {
                        Beer.find({ createdBy: req.params.id })
                            .exec(function (err, beers) {
                            if (err)
                                return next(err);
                            res.json(beers);
                        });
                    });
                });
            });
        });
    });
});
