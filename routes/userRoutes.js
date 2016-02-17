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
router.post('/connect/facebook/', auth, function (req, res, next) {
    https.get("https://graph.facebook.com/v2.5/me?access_token=" + req.body.accessToken + "&format=json&method=get&fields=email%2Cname%2Cid%2Cgender%2Clink&pretty=0&suppress_http_code=1", function (response) {
        response.on('data', function (d) {
            d = JSON.parse(d);
            if (!d.error) {
                User.findOne({
                    _id: req["payload._id"]
                }).exec(function (err, user) {
                    user.facebook.id = d.id;
                    user.facebook.email = d.email;
                    user.facebook.name = d.name;
                    user.facebook.token = req.body.accessToken;
                    user.facebook.profileUrl = d.link;
                    user.facebook.gender = d.link;
                    user.primaryEmail = user.primaryEmail || d.email;
                    user.save(function (err) {
                        if (err)
                            return next(err);
                        res.send({
                            token: user.generateJWT()
                        });
                    });
                });
            }
        });
    }).on('error', function (e) {
        console.log("Got error: " + e.message);
        return next(e);
    });
});
router.get("/:username", function (req, res, next) {
    User.findOne({ username: req.params["username"] }, { passwordHash: 0, salt: 0 })
        .populate("uPosts.postsOwn")
        .populate("uPosts.postsOthers")
        .exec(function (error, user) {
        if (error)
            return next(error);
        if (!user)
            return next({ message: "No user" });
        res.send(user);
    });
});
module.exports = router;
