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
