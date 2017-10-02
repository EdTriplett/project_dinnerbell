const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RatingSchema = new Schema({
  rated: {kind: String, item: {type:Schema.types.ObjectId, refPath: 'connections.kind'}},
  rating: {type: Number}
}, 
{timestamps: true})

// recipe and meal models need a 'kind' property which is a string

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating