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


router.get("/beer", (req,res,next) => {
    brewdb.search.beers({q:req.query.name}, (err, data)=> {
        res.send(data);
    });
});

router.get("/details/:id", (req,res,next) => {
    console.log()
    request("http://api.brewerydb.com/v2/beer/" + req.params.id + "?key="+process.env.brewdb_key,(err,response,body,data)=> {
        res.send(response.body)
    })
});

router.get("/:id", (req,res,next) => {
  console.log()
  request("http://api.brewerydb.com/v2/beer/" + req.params.id + "/breweries?key="+process.env.brewdb_key,(err,response,body,data)=> {
  res.send(response.body)
  })
});


export = router;
