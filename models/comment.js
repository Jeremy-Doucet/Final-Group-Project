"use strict";
var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
    message: { type: String, required: true },
    created: { type: Number, default: Date.now },
    deleted: { type: Number, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    posted: { type: Date, default: Date.now }
});
exports.Comment = mongoose.model('Comment', CommentSchema);
