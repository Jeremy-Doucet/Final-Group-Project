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
  newUser.setPassword(req.body.password);
  newUser.token = newUser.generateJWT();
  newUser.save((error, user, token): any => {
    if (error) return next(error);
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
/* istanbul ignore next */
router.post('/connect/facebook/', auth, (req, res, next) => {
  https.get(`https://graph.facebook.com/v2.5/me?access_token=${req.body.accessToken}&format=json&method=get&fields=email%2Cname%2Cid%2Cgender%2Clink&pretty=0&suppress_http_code=1`, (response) => {
    response.on('data', (d) => {
      d = JSON.parse(d);
      if (!d.error) {
        User.findOne({
          _id: req["payload._id"]
        }).exec((err, user) => {
          user.facebook.id = d.id;
          user.facebook.email = d.email;
          user.facebook.name = d.name;
          user.facebook.token = req.body.accessToken;
          user.facebook.profileUrl = d.link;
          user.facebook.gender = d.link;
          user.primaryEmail = user.primaryEmail || d.email;
          user.save((err) => {
            if (err) return next(err);
            res.send({
              token: user.generateJWT()
            });
          });
        });
      }
    });
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
    return next(e);
  });
});

////////////////////////
///GET: User for uHome
////////////////////////

router.get("/:username", (req, res, next) => {
  User.findOne({username: req.params["username"]}, {passwordHash: 0, salt: 0})
  .populate("uPosts.postsOwn")
  .populate("uPosts.postsOthers")
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
