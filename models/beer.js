'use strict';
var mongoose = require('mongoose');
var BeerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    imgurl: { type: String, required: true },
    review: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    created: { type: Number, default: Date.now },
    repostedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    ranking: { type: Number }
});
exports.Beer = mongoose.model('Beer', BeerSchema);
