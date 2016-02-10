"use strict";

////////////////////////
///Require modules
////////////////////////

require("dotenv").config({ silent: true });
import express = require('express');
import favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import passport = require("passport");
let mongoose = require("mongoose");

////////////////////////
///Constants
////////////////////////

const app = express();

////////////////////////
///Require models
////////////////////////

require("./models/user");

require("./passport/passport");

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
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

////////////////////////
///Passport FB Stuff
////////////////////////

app.use(passport.initialize());

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get("/auth/facebook/callback", passport.authenticate("facebook", {failureRedirect: "/login"}), function(req, res) {
  res.redirect("/");
});

////////////////////////
///Require routes
////////////////////////

let uRoutes = require("./routes/uRoutes");

app.use("/usershell", uRoutes);

////////////////////////
///Express static
////////////////////////

app.use(express.static('./public'));
app.use('/scripts', express.static('bower_components'));
app.use("/node_modules", express.static(__dirname + "/node_modules"));

////////////////////////
///Data: MongoDB, Mongoose, Mongo Express
////////////////////////

mongoose.connect("mongodb://lss:publicpwd@ds051524.mongolab.com:51524/grouptestdb");

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to GroupFinal DB");
});

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
