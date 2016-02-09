'use strict';

import mongoose = require('mongoose');

let BeerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  imgurl: { type: String, required: true },
  review: { type: String, required: true },
  brewerydb: {
    name: { type: String },
    abv: { type: Number },
    organic: { type: Boolean },
    breweryinfo: { type: String }
  },
  beerscores: {
    hoppiness: { type: Number },
    maltiness: { type: Number },
    body: { type: Number }
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  created: { type: Number, default: Date.now },
  repostedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  ranking: { type: Number }
});

export let Beer = mongoose.model('Beer', BeerSchema);
