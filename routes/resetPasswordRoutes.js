"use strict";
var express = require('express');
var expjwt = require("express-jwt");
var router = express.Router();
var waterfall = require('async-waterfall');
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var async = require('async');
var crypto = require('crypto');
var flash = require('express-flash');
var auth = expjwt({
    userProperty: "payload",
    secret: process.env.JWT_SECRET
});
var host;
if (process.env.NODE_ENV === 'production')
    host = 'http://ccbeerapp.herokuapp.com/';
else
    host = 'http://localhost:3000/';
router.post('/', function (req, res, next) {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            User.findOne({ email: req.body.email }, function (err, user) {
                if (!user) {
                    console.log('error', 'No account with that email address exists.');
                    return res.redirect('/forgot');
                }
                User.resetPasswordToken = token;
                User.resetPasswordExpires = Date.now() + 3600000;
                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            var smtpTransport = nodemailer.createTransport('smtps://CCAppGroup%40gmail.com:CCAppGr0up@smtp.gmail.com');
            var mailOptions = {
                to: user.email,
                from: 'passwordreset@demo.com',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    host + 'reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                ('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function (err) {
        if (err)
            return next(err);
        res.redirect('/');
    });
});
router.post('/reset/:token', function (req, res) {
    async.waterfall([
        function (done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                if (!user) {
                    console.log('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }
                user.setPassword(req.body.password);
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
                user.save(function (err) {
                    req.logIn(user, function (err) {
                        done(err, user);
                    });
                });
            });
        },
        function (user, done) {
            var smtpTransport = nodemailer.createTransport('smtps://CCAppGroup%40gmail.com:CCAppGr0up@smtp.gmail.com');
            var mailOptions = {
                to: user.email,
                from: 'passwordreset@demo.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                console.log('success', 'Success! Your password has been changed.');
                done(err);
            });
        }
    ], function (err) {
        res.redirect('/');
    });
});
module.exports = router;
