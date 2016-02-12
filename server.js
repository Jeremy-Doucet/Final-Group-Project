"use strict";
require("dotenv").config({ silent: true });
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require("passport");
var app = express();
var mongoose = require('mongoose');
require('./models/Comments');
require('./models/User');
require('./models/beer');
require("./passport/passport");
if (process.env.NODE_ENV === 'test')
    mongoose.connect(process.env.MONGO_TEST);
else
    mongoose.connect(process.env.MONGO_URL);
app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
if (process.env.NODE_ENV != 'test')
    app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.get("/auth/facebook", passport.authenticate("facebook"));
app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), function (req, res) {
    res.redirect("/");
});
var beerRoutes = require('./routes/beerRoutes');
var uRoutes = require("./routes/uRoutes");
var CommentsRoutes = require('./routes/CommentsRoutes');
app.use('/comments', CommentsRoutes);
app.use('/api/v1/beers', beerRoutes);
app.use("/usershell", uRoutes);
app.use(express.static('./public'));
app.use('/scripts', express.static('bower_components'));
app.use("/node_modules", express.static(__dirname + "/node_modules"));
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
