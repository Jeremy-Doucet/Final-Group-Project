"use strict";

////////////////////////
///Require modules
////////////////////////

import express = require("express");
let mongoose = require("mongoose");

let Beer = mongoose.model("Beer");

////////////////////////
///Router
////////////////////////

let router = express.Router();

////////////////////////
///GET: by location
////////////////////////

router.get("/byLocation/:location", (req, res, next) => {
  Beer.find({location: req.params["location"]})
  .populate("createdBy")
  .exec((error, beersLocal) => {
    if (error) return next(error);
    if (!beersLocal) res.send([]);
    res.send(beersLocal);
  });
});

///////////////////////////////////
///GET: by type
///////////////////////////////////

router.get("/byType/:type", (req, res, next) => {
  Beer.find({type: req.params["type"]})
  .populate("createdBy")
  .exec((error, beersType) => {
    if (error) return next(error);
    if (!beersType) return next([]);
    res.send(beersType);
  });
});

///////////////////////////////////
///GET: by popular
///////////////////////////////////

router.get("/popular", (req, res, next) => {
  Beer.find({})
  .populate("createdBy")
  .exec((error, beersPopular) => {
    if (error) return next(error);
    if (!beersPopular) return next([]);
    res.send(beersPopular);
  });
});

////////////////////////
///Export
////////////////////////

export = router;
