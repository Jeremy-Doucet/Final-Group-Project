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
///GET: User for uHome
////////////////////////

router.get("/byLocation/:region", (req, res, next) => {
  Beer.find({location: req.query["region"]})
  .exec((error, beers) => {
    if (error) return next(error);
    if (!beers) return next({message: "No beers"});
    res.send(beers);
  });
});

////////////////////////
///Export
////////////////////////

export = router;
