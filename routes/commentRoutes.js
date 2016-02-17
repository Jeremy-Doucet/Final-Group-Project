"use strict";
var express = require('express');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var router = express.Router();
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var Beer = mongoose.model('Beer');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});
router.get('/:id', function (req, res, next) {
    Comment.findOne({ _id: req.params.id })
        .exec(function (err, beer) {
        res.send(beer);
    });
});
router.post('/', auth, function (req, res, next) {
    console.log(1);
    Beer.findOne({ _id: req.body.Beer }).exec(function (err, Beer) {
        console.log(12);
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
            c.populate('createdBy', 'username', function (err, com) {
                res.send(c);
            });
        });
    });
});
router.put("/:_id", function (req, res, next) {
    Comment.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, function (err, result) {
        if (err)
            return next(err);
        if (!result)
            return next({ message: 'Could not find and update the comment.' });
        res.send(result);
    });
});
router.delete('/:id', auth, function (req, res, next) {
    Comment.remove({ _id: req.params.id }, function (err, result) {
        if (err)
            return next(err);
        User.update({ _id: req['payload']._id }, { $pull: { comments: req.params.id } }, function (err, result) {
            if (err)
                return next(err);
            Beer.update({ comments: req.params.id }, { $pull: { comments: req.params.id } }, function (err, result) {
                if (err)
                    return next(err);
                res.send({ message: 'Deleted the comment.' });
            });
        });
    });
});
module.exports = router;
