'use strict';

import express = require('express');
import jwt = require('express-jwt');
let mongoose = require('mongoose');
let router = express.Router();
let Beer = mongoose.model('Beer');
let User = mongoose.model('User');
let auth = jwt({
  userProperty: 'payload',
  secret: process.env.JWT_SECRET
});

//GET: /api/v1/likedBeers -- GOES TO BEERS COLLECTION, SEARCHES BY likedByUsers PROPERTY TO FIND ALL BEERS LIKED BY USER
router.get('/', auth, (req, res, next) =>{
  Beer.find({ likedByUsers: req['payload']._id })
    .exec((err, beers) => {
      if (err) return next(err);
      res.json(beers)
    })
})

//POST: /api/v1/likedBeers -- SAVES USER TO BEER model
router.post('/', auth, (req, res, next) => {
  Beer.findOne({ _id: req.body.beer })
  .exec((err, beer) => {
    if(err) return next(err);
    if(beer) {
      beer.likedByUsers.push(req['payload']._id);
      beer.save();
      next();
    };
  });
});

//POST /api/v1/likedBeers -- SAVES BEER TO USER MODEL
router.post('/', (req, res, next) => {
  User.findOne({ _id: req['payload']._id })
  .exec((err, user) => {
    if(err) return next(err);
    if(user) {
      user.likedBeers.push(req.body.beer);
      user.save();
      res.send({message: 'You have added this beer to your likes'})
    }
  })
})

//DELETE Unlike beer
router.delete('/:id', auth, (req, res, next) =>{
  User.update({ _id: req['payload']._id }, { $pull: { likedBeers: req.params.id } }, (err, result) => {
    if (err) return next(err);
    Beer.update({ _id: req.params.id },{ $pull: { likedByUsers: req['payload']._id } }, (err, result) => {
      if (err) return next(err);
      res.send({ message: 'Beer is unliked'})
    })
  })
})


export = router;
