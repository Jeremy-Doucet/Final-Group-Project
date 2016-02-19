"use strict";

////////////////////////
///Require modules
////////////////////////

import express = require("express");
import jwt = require("jsonwebtoken");
import expjwt = require("express-jwt");
let mongoose = require("mongoose");
import passport = require("passport");

let FacebookStrategy = require("passport-facebook").Strategy;

let auth = expjwt({
  userProperty: "payload",
  secret: process.env.JWT_SECRET
});

let https = require("https");

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
  newUser.avatarUrl = req.body.avatarUrl;
  newUser.facebook = {};
  newUser.setPassword(req.body.password);
  newUser.token = newUser.generateJWT();
  newUser.save((error, user, token): any => {
    if (error) return next(error);
    user.passwordHash = "";
    user.salt = "";
    res.send(user);
  });
});

router.post("/login", (req, res, next) => {
  if (!req.body.username) return next("Invalid username");
  if (!req.body.password) return next("Invalid password");
  passport.authenticate("local", (error, user, info): any => {
    if (error) return next(error);
    if (user) return res.json({token: user.generateJWT()});
    return res.send(info);
  }) (req, res, next);
});

////////////////////////
///GET: loginFB
////////////////////////

router.get('/auth/facebook',  passport.authenticate('facebook', {
  scope: ['email']
}));
/* istanbul ignore next */
router.get('/auth/facebook/callback',  passport.authenticate('facebook', {
  failureRedirect: '/Login'
}), (req, res) => {
  // if (req.isAuthenticated()) {
    res.redirect('/?code=' + req.user.generateJWT());
  // } else {
    // res.status(403).send("You are not authenticated.");
  // }
});

///////////////////////////////////
///GET: Individual User Information
///////////////////////////////////

router.get("/users/:id", (req, res, next) => {
  User.findOne({ _id: req.params.id }).select('-salt -passwordHash') // select('-salt -password') will send the user model information WITHOUT the salt or password hash properties
    .populate('beers', 'name imgurl')
    .exec((err, user) =>{
      res.send(user)
    });
});

////////////////////////
///Export
////////////////////////

export = router;
