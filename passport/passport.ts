"use strict";

////////////////////////
///Require modules
////////////////////////

import mongoose = require("mongoose");
import passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
let FacebookStrategy = require("passport-facebook").Strategy;

////////////////////////
///Require model
////////////////////////

let User = mongoose.model("User");
let newUser = mongoose.model("newUser");

////////////////////////
///Passport methods
////////////////////////

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((object, done) => {
  done(null, object);
});

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({username: username}, (error, user: any) => {
    if (error) return done(error);
    if (!user) return done(null, false, {message: "Invalid username"});
    if (!user.validatePassword(password)) return done(null, false, {message: "Invalid password"});
    return done(null, user);
  });
}));
