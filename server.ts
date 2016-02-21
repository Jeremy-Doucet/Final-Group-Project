"use strict";

require("dotenv").config({ silent: true });

import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import express = require('express');
import favicon = require('serve-favicon');
import logger = require('morgan');
import mongoose = require('mongoose');
import passport = require("passport");


////////////////////////
///Constants
////////////////////////

const app = express();

////////////////////////
///Models
////////////////////////

require('./models/beer');
require('./models/comment');
require('./models/user');

require("./passport/passport");

////////////////////////
///MongoDB
////////////////////////

if (process.env.NODE_ENV === 'test') {
  mongoose.connect(process.env.MONGO_TEST);
} else {
  mongoose.connect(process.env.MONGO_URL);
}

////////////////////////
///Views: EJS
////////////////////////

app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

////////////////////////
///Parse
////////////////////////

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (process.env.NODE_ENV != 'test')
  app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

////////////////////////
///Express static
////////////////////////git


app.use(express.static('./public'));
app.use('/scripts', express.static(__dirname + 'bower_components'));
app.use("/node_modules", express.static(__dirname + "/node_modules"));

////////////////////////
///Require routes
////////////////////////


let beerRoutes = require('./routes/beerRoutes');
let brewRoutes = require("./routes/brewRoutes");
let commentRoutes = require('./routes/commentRoutes');
let userRoutes = require("./routes/userRoutes");
let categoryRoutes = require("./routes/categoryRoutes");

// let DeleteCrudRoutes = require('./routes/DeleteCrudRoutes');
// app.use('/')

app.use('/api/v1/beer', beerRoutes);
app.use("/api/v1/brewdb", brewRoutes);
app.use('/comments', commentRoutes);
app.use("/usershell", userRoutes);
app.use("/catshell", categoryRoutes);

////////////////////////
///Express static
////////////////////////


app.use(express.static('./public'));
app.use('/scripts', express.static('bower_components'));
app.use("/node_modules", express.static(__dirname + "/node_modules"));

////////////////////////
///Misc
////////////////////////

app.get('/*', function(req, res, next) {
  if (/.js|.html|.css|templates|javascript/.test(req.path)) return next({ status: 404, message: 'Not Found' });
  if (/application\/json/.test(req.get('accept'))) {
    //respond json
    return next({ status: 404, message: 'Not Found' });
  } else {
    //respond in html
    return res.render('index');
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(req.path);
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers

app.use(function(err: any, req, res, next) {
  res.status(err.status || 500);
  if (err.name === 'CastError') err.message = 'Invalid ID';
  // Don't leak stack trace if not in development
  let error = (app.get('env') === 'development') ? err : {};
  res.send({
    message: err.message,
    error: error
  });
});

export = app;
