"use strict";

////////////////////////
///Require modules
////////////////////////

import crypto = require("crypto");
import jwt = require("jsonwebtoken");
let mongoose = require("mongoose");

////////////////////////
///Build schema
////////////////////////

let UserSchema = new mongoose.Schema({
  username: {type: String, unique: true, lowercase: true},
  email: {type: String, unique: true, lowercase: true},
  avatarUrl: String,
  facebook: {
      id: {type: String, unique: true, sparse: true},
      token: String,
      name: String,
      email: String,
      gender: String,
      profileUrl: String
    },
  beers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Beer'}],
  passwordHash: String,
  salt: String,
  token: Object,
  uBeersAll: {
    uBeersOwn: [{type: mongoose.Schema.Types.ObjectId, ref: "Beer"}],
    uBeersFav: [{type: mongoose.Schema.Types.ObjectId, ref: "Beer"}]
  }
});

UserSchema.method("setPassword", function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
});

UserSchema.method("validatePassword", function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
  return (hash === this.passwordHash);
});

UserSchema.method("generateJWT", function() {
  let facebook = (this.facebook.token) ? true : false;
  return jwt.sign({
    _id: this._id,
    username: this.username,
    email: this.email,
    avatarUrl: this.avatarUrl,
    facebook_email: this.facebook.email,
    facebook_name: this.facebook.name
  }, process.env.JWT_SECRET);
});

////////////////////////
///Export
////////////////////////

export let User = mongoose.model("User", UserSchema);
export let newUser = mongoose.model("newUser", UserSchema);
