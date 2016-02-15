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
router.post('/', auth, function (req, res, next) {
    console.log(1);
    Beer.findOne({ _id: req.body.Beer }).exec(function (err, Beer) {
        console.log(12);
        if (err)
            return next(err);
        console.log(13);
        if (!Beer)
            return next({ status: 404, message: "Beer could not be found." });
        console.log(14);
        req['Beer'] = Beer;
        console.log(15);
        next();
    });
});
router.post('/', function (req, res, next) {
    console.log(16);
    var comment = new Comment(req.body);
    console.log(17);
    comment.created = Date.now();
    console.log(18);
    comment.deleted = null;
    console.log(19);
    comment.createdBy = req['payload']._id;
    console.log(20);
    comment.createdByEmail = req['payload'].email;
    console.log(21);
    comment.createdByUsername = req['payload'].username;
    console.log(22);
    comment.save(function (err, c) {
        console.log(23);
        if (err)
            return next(err);
        console.log(24);
        if (!c)
            return next({ message: 'Error saving comment.' });
        console.log(25);
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
