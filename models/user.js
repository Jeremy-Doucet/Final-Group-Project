"use strict";
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, lowercase: true },
    email: { type: String, unique: true, lowercase: true },
    avatarUrl: String,
    facebook: {
        id: { type: String, unique: true, sparse: true },
        token: String,
        name: String,
        email: String,
        gender: String,
        profileUrl: String
    },
    beers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Beer' }],
    passwordHash: String,
    salt: String,
    token: Object
});
UserSchema.method("setPassword", function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
});
UserSchema.method("validatePassword", function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
    return (hash === this.passwordHash);
});
UserSchema.method("generateJWT", function () {
    var facebook = (this.facebook.token) ? true : false;
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        avatarUrl: this.avatarUrl,
        facebook: facebook
    }, process.env.JWT_SECRET);
});
exports.User = mongoose.model("User", UserSchema);
exports.newUser = mongoose.model("newUser", UserSchema);
