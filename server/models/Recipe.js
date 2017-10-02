const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RecipeSchema = new Schema({
  name: String,
  ingredients: [String],
  kind: String,
  owner: { type: Schema.types.ObjectId, ref: "User"},
  nutrition: {},
}, 
{timestamps: true})

// recipe and meal models need a 'kind' property which is a string

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe