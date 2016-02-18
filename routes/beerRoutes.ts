'use strict';

import express = require('express');
let request = require("request");
import jwt = require('express-jwt');
let mongoose = require('mongoose');
let Comment = mongoose.model('Comment');
let router = express.Router();
let Beer = mongoose.model('Beer');
let BreweryDb = require("brewerydb-node");
let brewdb = new BreweryDb(process.env.brewdb_key);
let User = mongoose.model('User');
let auth = jwt({
  userProperty: 'payload',
  secret: process.env.JWT_SECRET
});

router.get('/details/:id', (req, res, next) =>{
  Beer.findOne({ _id: req.params.id })
    .populate('createdBy', 'username')
    .populate('comments')
    .exec((err, beer) =>{
      Comment.populate(beer.comments,{path: "createdBy", select: "username" }, (err, result)=> {
        res.send(beer);

      })

  });
});

//POST: api/v1/beer
router.post('/addBeer', auth, (req, res, next) => {
    console.log(req.body)
  let newBeer = new Beer(req.body);
  newBeer.createdBy = req['payload']._id;
  newBeer.save((err, beer) =>{
    if(err) return next(err);
    User.update({ _id: req['payload']._id}, { $push: { 'beers': beer._id}}, (err, results) =>{
      if (err) return next(err);
      res.send(beer);
    });
  });
});

//PUT: api/v1/beer/:id
router.put('/details/:_id', (req, res, next) => {
  Beer.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, (err, result) => {
    if (err) return next(err);
    if (!result) return next({ message: 'Could not find and update the beer.' });
    res.send(result);
  })
})

//DELETE: api/v1/beer?_id={{beer_id}}
router.delete('/details/:_id',(req,res,next)=> {
  if(!req.query._id) return next({ status: 404, message: 'Please include an ID' });
  Beer.remove({_id:req.query._id},(err,result)=> {
    res.send({message: "Successfully deleted beer"})
  })
})

//GET: BreweryDB get call
router.get("/breweryDetails/:id", (req,res,next) => {
    console.log()
    request("http://api.brewerydb.com/v2/beer/" + req.params.id + "/breweries?key="+process.env.brewdb_key,(err,response,body,data)=> {
        res.send(response.body)
    })
});

//GET: BreweryDB get call
router.get("/searchBeer", (req,res,next) => {
    brewdb.search.beers({q:req.query.name}, (err, data)=> {
        res.send(data);
    });
});
export = router;
