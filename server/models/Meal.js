const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MealSchema = new Schema({
  name: String,
  kind: String,
  date: Number,
  owner: { type: Schema.types.ObjectId, ref: "User"},
  recipes: [{ type: Schema.types.ObjectId, ref: "Recipe"}],
  unregisteredGuests: [String],
  registeredGuests: [{ type: Schema.types.ObjectId, ref: "User"}],
  tasks: [String]
}, 
{timestamps: true})

// recipe and meal models need a 'kind' property which is a string

const Meal = mongoose.model('Meal', MealSchema);

module.exports = Meal