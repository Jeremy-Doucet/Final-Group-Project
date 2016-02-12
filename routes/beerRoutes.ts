'use strict';

import express = require('express');
let request = require("request");
import jwt = require('express-jwt');
let mongoose = require('mongoose');
let router = express.Router();
let Beer = mongoose.model('Beer');
let BreweryDb = require("brewerydb-node");
let brewdb = new BreweryDb(process.env.brewdb_key);
// let User = mongoose.model('User');
let auth = jwt({
  userProperty: 'payload',
  secret: process.env.JWT_SECRET
});


//GET: /api/v1/beer
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

router.get("/:id", (req,res,next) => {
    console.log()
    request("http://api.brewerydb.com/v2/beer/" + req.params.id + "/breweries?key="+process.env.brewdb_key,(err,response,body,data)=> {
        res.send(response.body)
    })
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
