"use strict";
var express = require("express");
var expjwt = require("express-jwt");
var mongoose = require("mongoose");
var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;
var auth = expjwt({
    userProperty: "payload",
    secret: process.env.JWT_SECRET
});
var https = require("https");
var User = mongoose.model("User");
var newUser = mongoose.model("User");
var router = express.Router();
router.post("/register", function (req, res, next) {
    var newUser = new User();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.avatarUrl = req.body.avatarUrl;
    newUser.facebook = {};
    newUser.setPassword(req.body.password);
    newUser.token = newUser.generateJWT();
    newUser.save(function (error, user, token) {
        if (error)
            return next(error);
        user.passwordHash = "";
        user.salt = "";
        res.send(user);
    });
});
router.post("/login", function (req, res, next) {
    if (!req.body.username)
        return next("Invalid username");
    if (!req.body.password)
        return next("Invalid password");
    passport.authenticate("local", function (error, user, info) {
        if (error)
            return next(error);
        if (user)
            return res.json({ token: user.generateJWT() });
        return res.send(info);
    })(req, res, next);
});
router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email']
}));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/Login'
}), function (req, res) {
    res.redirect('/?code=' + req.user.generateJWT());
});
router.get("/users/:id", function (req, res, next) {
    User.findOne({ _id: req.params.id }).select('-salt -passwordHash')
        .populate('beers', 'name imgurl imgbeer')
        .exec(function (err, user) {
        res.send(user);
    });
});
module.exports = router;
