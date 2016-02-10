"use strict";
var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;
var User = mongoose.model("User");
var newUser = mongoose.model("User");
var router = express.Router();
router.post("/register", function (req, res, next) {
    var newUser = new User();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
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
router.get("/loginFB", passport.authenticate("facebook"));
router.get("/loginFB/return", passport.authenticate("facebook", { failureRedirect: "/login" }), function (req, res, next) { res.redirect("/"); });
router.get("/:username", function (req, res, next) {
    User.findOne({ username: req.params["username"] })
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
