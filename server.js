"use strict";
require("dotenv").config({ silent: true });
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require("passport");
var app = express();
require('./models/beer');
require('./models/comment');
require('./models/user');
require("./passport/passport");
if (process.env.NODE_ENV === 'test') {
    mongoose.connect("mongodb://lss:publicpwd@ds051524.mongolab.com:51524/grouptestdb");
}
else {
    mongoose.connect("mongodb://lss:publicpwd@ds051524.mongolab.com:51524/grouptestdb");
}
app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
if (process.env.NODE_ENV != 'test')
    app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
var beerRoutes = require('./routes/beerRoutes');
var commentRoutes = require('./routes/commentRoutes');
var userRoutes = require("./routes/userRoutes");
app.use('/api/v1/beer', beerRoutes);
app.use('/comments', commentRoutes);
app.use("/usershell", userRoutes);
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
