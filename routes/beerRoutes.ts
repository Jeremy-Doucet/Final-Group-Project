'use strict';

import express = require('express');
import jwt = require('express-jwt');
let mongoose = require('mongoose');
let router = express.Router();
let Beer = mongoose.model('Beer');
// let User = mongoose.model('User');
let auth = jwt({
  userProperty: 'payload',
  secret: process.env.JWT_SECRET
});


//GET: /api/v1/beer
router.get('/', (req, res, next) => {
  Beer.find({})
    .exec((err, beers) =>{
      if (err) return next(err);
      res.json(beers)
    });
});


//POST: api/v1/beer
router.post('/', (req, res, next) => {
  let newBeer = new Beer(req.body);
  // newBeer.createdBy = req['payload']._id;
  newBeer.save((err, beer) =>{
    if(err) return next(err);
    // User.update({ _id: req['payload']._id}, { $push: { 'beer': beer._id}}, (err, results) =>{
    //   if (err) return next(err);
      res.send(beer);
    });
  });
// });

export = router;

// add auth parameter back into the post function when you have access to the user model
