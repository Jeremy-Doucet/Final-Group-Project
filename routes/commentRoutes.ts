'use strict';

import express = require('express');
import jwt = require('express-jwt');
let mongoose = require('mongoose');
let router = express.Router();
let Comment = mongoose.model('Comment');
let User = mongoose.model('User');
let Beer = mongoose.model('Beer');
let auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

router.get('/:id', (req, res, next) =>{
  Comment.findOne({_id: req.params.id})
  .exec((err, beer) => {
    res.send(beer);
  });
});

// POST: /api/comments
router.post('/', auth, (req, res, next) => {
  console.log(1)
  Beer.findOne({_id: req.body.Beer})
  .exec((err, Beer) => {
    console.log(12)
    if (err) return next(err);
    if (!Beer) return next({status: 404, message: 'Beer could not be found.'});
    req['Beer'] = Beer;
    next();
  });
});

// POST: /api/comments -- Beer Exists && User Logged In
router.post('/', (req, res, next) => {
  let comment = new Comment(req.body);
  comment.created = Date.now();
  comment.deleted = null;
  comment.createdBy = req['payload']._id;
  comment.createdByEmail = req['payload'].email;
  comment.createdByUsername = req['payload'].username;
  comment.save((err, c) => {
    if (err) return next(err);
    if (!c) return next({message: 'Error saving comment.'});
    req['Beer'].comments.push(c._id);
    req['Beer'].save();
    User.update({_id: req['payload']._id}, {$push: {comments: c._id}}, (err, result) => {
      if (err) return next(err);
      c.populate('createdBy', 'username', (err, com) => {
        res.send(c);
      });
    });
  });
});

// PUT: /Comment/:_id
router.put('/:_id', (req, res, next) => {
  Comment.findOneAndUpdate({_id: req.params._id}, req.body, {new: true}, (err, result) => {
    if (err) return next(err);
    if (!result) return next({message: 'Could not find and update the comment.'});
    res.send(result);
  });
});

// DELETE: /api/comments/:id
router.delete('/:id', auth, (req, res, next) => {
  Comment.remove({_id: req.params.id}, (err, result) => {
    if (err) return next(err);
    User.update({_id: req['payload']._id}, {$pull: {comments: req.params.id}}, (err, result) => {
      if (err) return next(err);
      Beer.update({comments: req.params.id}, {$pull: {comments: req.params.id}}, (err, result) => {
        if (err) return next(err);
        res.send({message: 'Deleted the comment.'});
      });
    });
  });
});

export = router;
