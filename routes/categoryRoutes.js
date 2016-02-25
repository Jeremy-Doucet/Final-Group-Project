'use strict';
var express = require('express');
var mongoose = require('mongoose');
var Beer = mongoose.model('Beer');
var router = express.Router();
router.get('/byLocation/:location', function (req, res, next) {
    Beer.find({ location: req.params['location'] })
        .populate('createdBy')
        .exec(function (error, beersLocal) {
        if (error)
            return next(error);
        if (!beersLocal)
            res.send([]);
        res.send(beersLocal);
    });
});
router.get('/byType/:type', function (req, res, next) {
    Beer.find({ type: req.params['type'] })
        .populate('createdBy')
        .exec(function (error, beersType) {
        if (error)
            return next(error);
        if (!beersType)
            return next([]);
        res.send(beersType);
    });
});
router.get('/popular', function (req, res, next) {
    Beer.find({})
        .populate('createdBy')
        .exec(function (error, beersPopular) {
        if (error)
            return next(error);
        if (!beersPopular)
            return next([]);
        res.send(beersPopular);
    });
});
module.exports = router;
