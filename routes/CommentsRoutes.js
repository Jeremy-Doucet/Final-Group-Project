"use strict";
var express = require('express');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var router = express.Router();
var Comment = mongoose.model('Comments');
var User = mongoose.model('User');
var Beer = mongoose.model('Beer');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});
router.get("/", function (req, res, next) {
    Beer.find({})
        .exec(function (err, Beer) {
        if (err)
            return next(err);
        res.json(Beer);
    });
});
router.post('/', auth, function (req, res, next) {
    Beer.findOne({ _id: req.body.Beer }).exec(function (err, Beer) {
        if (err)
            return next(err);
        if (!Beer)
            return next({ status: 404, message: "Beer could not be found." });
        req['Beer'] = Beer;
        next();
    });
});
router.post('/', function (req, res, next) {
    var comment = new Comment(req.body);
    comment.created = Date.now();
    comment.deleted = null;
    comment.createdBy = req['payload']._id;
    comment.createdByEmail = req['payload'].email;
    comment.createdByUsername = req['payload'].username;
    comment.save(function (err, c) {
        if (err)
            return next(err);
        if (!c)
            return next({ message: 'Error saving comment.' });
        req['Beer'].comments.push(c._id);
        req['Beer'].save();
        User.update({ _id: req['payload']._id }, { $push: { comments: c._id } }, function (err, result) {
            if (err)
                return next(err);
            c.populate('createdBy', 'email username', function (err, com) {
                res.send(c);
            });
        });
    });
});
router.delete('/:id', auth, function (req, res, next) {
    Comment.update({ _id: req.params.id }, { deleted: Date.now() }, function (err, result) {
        if (err)
            return next(err);
        res.send({ message: 'Deleted the comment.' });
    });
});
module.exports = router;
