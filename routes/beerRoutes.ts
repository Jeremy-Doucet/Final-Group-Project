'use strict';

import express = require('express');
let request = require('request');
import jwt = require('express-jwt');
let mongoose = require('mongoose');
let Comment = mongoose.model('Comment');
let router = express.Router();
let Beer = mongoose.model('Beer');
let BreweryDb = require('brewerydb-node');
let brewdb = new BreweryDb(process.env.brewdb_key);
let User = mongoose.model('User');
let auth = jwt({
  userProperty: 'payload',
  secret: process.env.JWT_SECRET
});

//GET: INDIVIDUAL BEER DETAILS -- /api/v1/beer/details/:id
router.get('/details/:id', (req, res, next) => {
  Beer.findOne({ _id: req.params.id })
    .populate('createdBy', 'username avatarUrl')
    .populate('comments')
    .exec((err, beer) =>{
      Comment.populate(beer.comments,{path: "createdBy", select: "username avatarUrl" }, (err, result)=> {
        res.send(beer);
      })
  });
});

//GET: QUERY ALL BEERS -- /api/v1/beer
router.get('/', (req, res, next) => {
  Beer.find({})
  .populate('createdBy', 'username')
  .exec((err, beers) => {
    if (err) return next(err);
    res.json(beers);
  });
});

//GET: USERHOME Get all Beers posted by createdBy /api/v1/beer/userposts
router.get('/userHomeBeers', auth, (req, res, next) => {
  Beer.find({createdBy: req['payload']._id })
  .exec((err, beers) => {
    if (err) return next(err);
    res.json(beers);
  });
});

//GET: userDETAILS Get all Beers posted by createdBy /api/v1/beer/userposts
router.get('/userBeers/:id', auth, (req, res, next) => {
  Beer.find({createdBy: req.params.id})
  .exec((err, beers) => {
    if (err) return next(err);
    res.json(beers);
  });
});

//POST: api/v1/beer
router.post('/', auth, (req, res, next) => {
  let newBeer = new Beer(req.body);
  newBeer.createdBy = req['payload']._id;
  newBeer.save((err, beer) => {
    if(err) return next(err);
    User.update({_id: req['payload']._id}, {$push: {'beers': beer._id}}, (err, results) => {
      console.log('saved beer to user');
      if (err) return next(err);
      res.send(beer);
    });
  });
});

//PUT: api/v1/beer/:id
router.put('/:_id', (req, res, next) => {
  Beer.findOneAndUpdate({_id: req.params._id}, req.body, {new: true}, (err, result) => {
    if (err) return next(err);
    if (!result) return next({message: 'Could not find and update the beer.'});
    res.send(result);
  });
});

//DELETE
router.delete('/',(req,res,next) => {
  if(!req.query._id) return next({status: 404})
  // -Add A Beer- model below
  Beer.remove({_id:req.query._id},(err,result) => {
    res.send({message: 'Deleted.'});
  });
});



//GET: USERHOME Get all Beers posted by createdBy /api/v1/beer/userposts
router.get('/userHomeBeers', auth, (req, res, next) => {
 Beer.find({ createdBy: req['payload']._id })
   .exec((err, beers) =>{
     if (err) return next(err);
     res.json(beers)
   })
})

//GET: userDETAILS Get all Beers posted by createdBy /api/v1/beer/userposts
router.get('/userBeers/:id', auth, (req, res, next) => {
 Beer.find({ createdBy: req.params.id })
   .exec((err, beers) =>{
     if (err) return next(err);
     res.json(beers)
   })
})



export = router;
