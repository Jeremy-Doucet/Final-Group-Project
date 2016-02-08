"use strict";

require("dotenv").config({ silent: true });
import express = require('express');
import favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');

const app = express();

import mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, function(err){
  if (err) console.log(err);
  else console.log('youre connected');
});

// view engine setup
app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('./public'));
app.use('/scripts', express.static('bower_components'));


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
    // if (err.name = 'CastError') err.message = 'Invalid ID';
    // Don't leak stack trace if not in development
    let error = (app.get('env') === 'development') ? err : {};
    res.send({
      message: err.message,
      error: error
    });
  });

export = app;
