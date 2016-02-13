"use strict";

import mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
  message: {type: String, required:true},
  created: {type: Number, default: Date.now},
  deleted: {type: Number, default: null},
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
  posted:{type:Date, default: Date.now}
});

export let Comment = mongoose.model('Comment', CommentSchema);
