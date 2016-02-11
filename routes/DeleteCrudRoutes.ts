'use strict'

import express = require("express");
import jwt = require('express-jwt');
let mongoose = require("mongoose");
let router = express.Router();
let Comment = mongoose.model('Comment');
let Beer = mongoose.model('Beer');
let auth = jwt({
  userProperty: 'payload',
  secret: process.env.JWT_SECRET
});


router.delete('/',(req,res,next)=> {
  if(!req.query._id) return next({ status: 404, })
  // -Add A Beer- model below
  Beer.remove({_id:req.query._id},(err,result)=> {
    res.send({message: "Deleted."})
  })
})

export = router;
