'use strict';
require('dotenv').config({ silent: true });
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var app = express();
require('./models/beer');
require('./models/comment');
require('./models/user');
require("./passport/passport");
if (process.env.NODE_ENV === 'test') {
    mongoose.connect(process.env.MONGO_TEST);
}
else {
    mongoose.connect(process.env.MONGO_URL);
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
app.use(express.static('./public'));
app.use('/scripts', express.static(__dirname + 'bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
var beerRoutes = require('./routes/beerRoutes');
var brewRoutes = require('./routes/brewRoutes');
var commentRoutes = require('./routes/commentRoutes');
var userRoutes = require("./routes/userRoutes");
var resetPasswordRoutes = require('./routes/resetPasswordRoutes');
var categoryRoutes = require("./routes/categoryRoutes");
var likedRoutes = require('./routes/likedRoutes');
app.use('/api/v1/beer', beerRoutes);
app.use('/api/v1/brewdb', brewRoutes);
app.use('/comments', commentRoutes);
app.use("/usershell", userRoutes);
app.use("/catshell", categoryRoutes);
app.use('/api/v1/likedBeers', likedRoutes);
app.use('/forgot', resetPasswordRoutes);
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
    console.log(req.path);
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    if (err.name === 'CastError')
        err.message = 'Invalid ID';
    var error = (app.get('env') === 'development') ? err : {};
    res.send({
        message: err.message,
        error: error
    });
});
module.exports = app;
