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
  username: {type: String, unique: true, lowercase: true, required: true},
  facebookId: String,
  email: {type: String, unique: true, lowercase: true, required: true},
  avatarUrl: String,
  passwordHash: {type: String, required: true},
  salt: String,
  token: Object
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
  return jwt.sign({
    _id: this._id,
    username: this.username,
    email: this.email
  }, process.env.JWT_SECRET);
});

////////////////////////
///Export
////////////////////////

export let User = mongoose.model("User", UserSchema);
export let newUser = mongoose.model("newUser", UserSchema);
