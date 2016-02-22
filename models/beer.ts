'use strict';

import mongoose = require('mongoose');

let BeerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  beerdesc: { type: String },
  imgurl: { type: String },
  imgbeer: { type: String },
  review: { type: String, required: true },
  brewerydb: {
      breweryName: { type: String },
      breweryDesc: { type: String },
      abv: { type: Number },
      beerType: {type: String },
      labelImg: {type: String },
      breweryUrl: {type: String },
      organic: { type: Boolean }
  },
  beerscores: {
    hoppiness: { type: Number },
    maltiness: { type: Number },
    body: { type: Number }
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likedByUsers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  created: { type: Number, default: Date.now },
  repostedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  ranking: { type: Number }
});

export let Beer = mongoose.model('Beer', BeerSchema);
