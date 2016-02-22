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
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    passReqToCallback: true,
    profileFields: ['emails', 'name', 'gender', 'profileUrl']
}, function (req, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        User.findOne({
            'facebook.id': profile.id
        }, function (err, user) {
            if (err)
                return done(err);
            if (user) {
                req.tempUser = user;
                return done(null, user);
            }
            else {
                var newUser_1 = new User();
                newUser_1.facebook.id = profile.id;
                newUser_1.facebook.token = accessToken;
                newUser_1.facebook.email = profile.emails[0].value;
                newUser_1.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                newUser_1.facebook.gender = profile.gender;
                newUser_1.facebook.profileUrl = profile.profileUrl;
                newUser_1.facebook.displayName = profile.displayName;
                newUser_1.primaryEmail = profile.emails[0].value;
                newUser_1.save(function (err) {
                    if (err)
                        return done(err);
                    req.login(newUser_1, function (err) {
                        if (err)
                            return done(err);
                        req.tempUser = newUser_1;
                        return done(null, newUser_1);
                    });
                });
            }
        });
    });
}));
