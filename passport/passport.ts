"use strict";

////////////////////////
///Require modules
////////////////////////

let mongoose = require("mongoose");
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

/* istanbul ignore next */
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  passReqToCallback: true,
  profileFields: ['emails', 'name', 'gender', 'profileUrl']
}, (req, accessToken, refreshToken, profile, done) => {
  process.nextTick(() => {
    User.findOne({
      'facebook.id': profile.id
    }, (err, user) => {
      if (err) return done(err);
      if (user) {
        req.tempUser = user;
        return done(null, user);
      } else {
        let newUser = new User();
        newUser.facebook.id = profile.id;
        newUser.facebook.token = accessToken;
        newUser.facebook.email = profile.emails[0].value;
        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
        newUser.facebook.gender = profile.gender;
        newUser.facebook.profileUrl = profile.profileUrl;
        newUser.facebook.displayName = profile.displayName;
        newUser.primaryEmail = profile.emails[0].value;
        newUser.save((err) => {
          if (err) return done(err);
          req.login(newUser, (err) => {
            if (err) return done(err);
            req.tempUser = newUser;
            return done(null, newUser);
          });
        });
      }
    });
  });
}));
