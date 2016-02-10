"use strict";
import express = require('express');
import jwt = require('express-jwt');
let mongoose = require('mongoose');

let router = express.Router();
let Comment = mongoose.model('Comments');
let User = mongoose.model('User');
let Beer = mongoose.model('Beer');

let auth = jwt({
    secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});


// POST: /api/comments
router.post('/', auth, (req, res, next) => {
  // Check that the Beer actually exists before saving the comment
  Beer.findOne({ _id: req.body.Beer }).exec((err, Beer) => {
    if (err) return next(err);
    if (!Beer) return next({ status: 404, message: "Beer could not be found." });
    // next no params -- go to the next route, post: /api/comments
    req['Beer'] = Beer;
    next();
  });
});

// POST: /api/comments -- Beer Exists && User Logged In
router.post('/', (req, res, next) => {
  // create the comment object
  let comment = new Comment(req.body);
  comment.created = Date.now();
  comment.deleted = null;
  comment.createdBy = req['payload']._id;
  comment.createdByEmail = req['payload'].email;
  comment.createdByUsername = req['payload'].username;
  comment.save((err, c) => {
    if (err) return next(err);
    if (!c) return next({ message: 'Error saving comment.' });
    // push this comment into the Beer we found in the route above, and save that Beer
    req['Beer'].comments.push(c._id);
    req['Beer'].save();
    // push this comment into the logged in user
    User.update({ _id: req['payload']._id }, { $push: { comments: c._id }}, (err, result) => {
      if (err) return next(err);
      // populate the user information on the comment
      c.populate('createdBy', 'email username', (err, com) => {
        // return the saved comment back to the user
        res.send(c);
      });
    });
  });
});

// DELETE: /api/comments/:id
router.delete('/:id', auth, (req, res, next) => {
  Comment.update({ _id: req.params.id }, { deleted: Date.now() }, (err, result) => {
    if (err) return next(err);
    res.send({ message: 'Deleted the comment.' });
  });
});

export = router;
