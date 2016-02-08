"use strict";
require("dotenv").config({ silent: true });
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require("passport");
var mongoose = require("mongoose");
var app = express();
require("./models/user");
require("./passport/passport");
app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
var uRoutes = require("./routes/uRoutes");
app.use("/usershell", uRoutes);
app.use(express.static('./public'));
app.use('/scripts', express.static('bower_components'));
app.use("/node_modules", express.static(__dirname + "/node_modules"));
mongoose.connect(process.env.MONGO_URL);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected to GroupFinal DB");
});
app.get('/*', function (req, res, next) {
    if (/.js|.html|.css|templates|javascript/.test(req.path))
        return next({ status: 404, message: 'Not Found' });
    if (/application\/json/.test(req.get('accept'))) {
        return next({ status: 404, message: 'Not Found' });
    }
    else {
        return res.render('index');
    }
});
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    if (err.name === 'CastError')
        err.message = 'Invalid ID';
    var error = (app.get('env') === 'development') ? err : {};
    res.send({
        message: err.message,
        error: error
    });
});
module.exports = app;
