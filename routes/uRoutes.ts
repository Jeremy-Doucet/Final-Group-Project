"use strict";

////////////////////////
///Require modules
////////////////////////

import express = require("express");
import jwt = require("jsonwebtoken");
let mongoose = require("mongoose");
import passport = require("passport");

let User = mongoose.model("User");
let newUser = mongoose.model("User");

////////////////////////
///Router
////////////////////////

let router = express.Router();

////////////////////////
///POST: User
////////////////////////

router.post("/register", (req, res, next) => {
  let newUser = new User();
  newUser.username = req.body.username;
  newUser.email = req.body.email;
  newUser.setPassword(req.body.password);
  newUser.token = newUser.generateJWT();
  newUser.save((error, user, token) => {
    if (error) return next(error);
    res.send(user);
  });
});

router.post("/login", (req, res, next) => {
  if (!req.body.username) return next("Invalid username");
  if (!req.body.password) return next("Invalid password");
  passport.authenticate("local", (error, user, info) => {
    if (error) return next(error);
    if (user) return res.json({token: user.generateJWT()});
    return res.send(info);
  }) (req, res, next);
});

////////////////////////
///GET: User for uHome
////////////////////////

router.get("/:username", (req, res, next) => {
  User.findOne({username: req.params["username"]})
  .populate("uPosts.postsOwn")
  .populate("uPosts.postsOthers")
  .populate("uComments")
  .exec((error, user) => {
    if (error) return next(error);
    if (!user) return next({message: "No user"});
    res.send(user);
  });
});

////////////////////////
///Export
////////////////////////

export = router;
