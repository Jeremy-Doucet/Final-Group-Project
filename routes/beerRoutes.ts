'use strict';

import express = require('express');
let request = require("request");
import jwt = require('express-jwt');
let mongoose = require('mongoose');
let router = express.Router();
let Beer = mongoose.model('Beer');
let BreweryDb = require("brewerydb-node");
let brewdb = new BreweryDb(process.env.brewdb_key);
let User = mongoose.model('User');
let auth = jwt({
  userProperty: 'payload',
  secret: process.env.JWT_SECRET
});


router.get("/", (req,res,next) => {
    Beer.find({})
    .populate("createdBy","username")
    .exec((err, beers) => {
        if (err) return next(err);
        res.send(beers)
    });
});


//GET: /api/v1/beer/details/:id
router.get('/details/:id', (req, res, next) =>{
  Beer.findOne({ _id: req.params.id })
    .populate('createdBy', 'username')
    // .populate('comments')
    .exec((err, beer) =>{
      res.send(beer)
  });
});

//GET: BreweryDB get call
router.get("/beer", (req,res,next) => {
    brewdb.search.beers({q:req.query.name}, (err, data)=> {
        res.send(data);
    });
});

// router.get("/brew", (req,res,next) => {
//     brewdb.search.breweries({q:req.query.name}, (err, data)=> {
//         res.json(data);
//     });
// });

//GET: BreweryDB get call
router.get("/:id", (req,res,next) => {
    console.log()
    request("http://api.brewerydb.com/v2/beer/" + req.params.id + "/breweries?key="+process.env.brewdb_key,(err,response,body,data)=> {
        res.send(response.body)
    })
});

//GET: /api/v1/beer
router.get('/', (req, res, next) => {
  Beer.find({})
    .populate('createdBy', 'username')
    .exec((err, beers) =>{
      if (err) return next(err);
      res.json(beers)
    });
});

//POST: api/v1/beer
router.post('/', auth, (req, res, next) => {
    console.log(req.body)
  let newBeer = new Beer(req.body);
  newBeer.createdBy = req['payload']._id;
  newBeer.save((err, beer) =>{
    if(err) return next(err);
    User.update({ _id: req['payload']._id}, { $push: { 'beer': beer._id}}, (err, results) =>{
      if (err) return next(err);
      res.send(beer);
    });
  });
});

router.delete('/',(req,res,next)=> {
  if(!req.query._id) return next({ status: 404, })
  // -Add A Beer- model below
  Beer.remove({_id:req.query._id},(err,result)=> {
    res.send({message: "Deleted."})
  })
})

export = router;
