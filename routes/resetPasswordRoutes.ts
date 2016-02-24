"use strict";

import express = require('express');
import jwt = require('jsonwebtoken');
import expjwt = require("express-jwt");
import passport = require("passport");
let router = express.Router();
let waterfall = require('async-waterfall');
let nodemailer = require('nodemailer');
let mongoose = require('mongoose');
let User = mongoose.model('User');
let async = require('async');
let crypto = require('crypto');
let flash = require('express-flash');
let auth = expjwt({
  userProperty: "payload",
  secret: process.env.JWT_SECRET
});
let host
if (process.env.NODE_ENV === 'production')
host = 'http://ccbeerapp.herokuapp.com/';
else host = 'http://localhost:3000/'


router.post('/', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });

    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        console.log('req.body.email')
        if (!user) {
          console.log('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport(`smtps://${process.env.GMAIL_USER}%40gmail.com:${process.env.GMAIL_PASS}@smtp.gmail.com`);
      var mailOptions = {
        to: user.email,
        from: 'passwordreset@demo.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        host + 'reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        ('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
      if (err) return next(err);
      res.redirect('/');
    });
});

// router.get('/reset/:token', function(req, res) {
//   User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
//     if (!user) {
//       req.flash('error', 'Password reset token is invalid or has expired.');
//       return res.redirect('/forgot');
//     }
//     res.render('/reset', {
//       user: req.user
//     });
//   });
// });



router.post('/reset/:token', function(req, res,next) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            console.log('error', 'Password reset token is invalid or has expired.');
          return next('no user found');
        }


        user.setPassword(req.body.setPassword);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function(err) {
          req.logIn(user, function(err) {
            done(err, user);
          });
        });
      });
    },
    function(user, done) {
      var smtpTransport =      nodemailer.createTransport(`smtps://${process.env.GMAIL_USER}%40gmail.com:${process.env.GMAIL_PASS}@smtp.gmail.com`);
      var mailOptions = {
        to: user.email,
        from: 'passwordreset@demo.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
        'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
          console.log('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
      res.end();
    });
});




module.exports = router;
