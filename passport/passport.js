"use strict";
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var User = mongoose.model("User");
var newUser = mongoose.model("newUser");
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (object, done) {
    done(null, object);
});
passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (error, user) {
        if (error)
            return done(error);
        if (!user)
            return done(null, false, { message: "Invalid username" });
        if (!user.validatePassword(password))
            return done(null, false, { message: "Invalid password" });
        return done(null, user);
    });
}));
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/",
    passReqToCallback: true,
    profileFields: ["id", "name", "email"]
}, function (req, accessToken, refreshToken, profile, done) {
    User.findOne({ email: profile.email }, function (error, user) {
        if (error)
            return done(error, null);
        if (user) {
            req["tempUser"] = user;
            return done(null, user);
        }
        var newUser = new User();
        newUser.email = profile.email;
        newUser.facebookId = profile.id;
        newUser.save(function (error, userSaved) {
            if (error)
                return error;
            req["tempUser"] = userSaved;
            return (error, userSaved);
        });
    });
}));
