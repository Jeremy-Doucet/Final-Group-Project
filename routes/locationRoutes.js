"use strict";
var express = require("express");
var mongoose = require("mongoose");
var Beer = mongoose.model("Beer");
var router = express.Router();
router.get("/byLocation/:region", function (req, res, next) {
    Beer.find({ location: req.query["region"] })
        .exec(function (error, beers) {
        if (error)
            return next(error);
        if (!beers)
            return next({ message: "No beers" });
        res.send(beers);
    });
});
module.exports = router;
