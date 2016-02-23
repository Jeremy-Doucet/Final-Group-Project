'use strict';
var express = require('express');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var router = express.Router();
var Beer = mongoose.model('Beer');
var User = mongoose.model('User');
var auth = jwt({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});
router.get('/', auth, function (req, res, next) {
    Beer.find({ likedByUsers: req['payload']._id })
        .exec(function (err, beers) {
        if (err)
            return next(err);
        res.json(beers);
    });
});
router.post('/', auth, function (req, res, next) {
    Beer.findOne({ _id: req.body.beer })
        .exec(function (err, beer) {
        if (err)
            return next(err);
        if (beer) {
            beer.likedByUsers.push(req['payload']._id);
            beer.save();
            next();
        }
        ;
    });
});
router.post('/', function (req, res, next) {
    User.findOne({ _id: req['payload']._id })
        .exec(function (err, user) {
        if (err)
            return next(err);
        if (user) {
            user.likedBeers.push(req.body.beer);
            user.save();
            res.send({ message: 'You have added this beer to your likes' });
        }
    });
});
router.delete('/:id', auth, function (req, res, next) {
    User.update({ _id: req['payload']._id }, { $pull: { likedBeers: req.params.id } }, function (err, result) {
        if (err)
            return next(err);
        Beer.update({ _id: req.params.id }, { $pull: { likedByUsers: req['payload']._id } }, function (err, result) {
            if (err)
                return next(err);
            res.send({ message: 'Beer is unliked' });
        });
    });
});
module.exports = router;
