const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Ratable = require('./Ratable')

const MealSchema = new Schema(
  {
    name: String,
    date: Number,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    unregisteredGuests: [String],
    registeredGuests: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tasks: [String],
    ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
  },
  { timestamps: true,
  discriminatorKey: 'ratable' }
);

const populateAll = function(next) {
   this.populate("recipes owner ratings registeredGuests");
  next();
};
MealSchema.pre("find", populateAll);
MealSchema.pre("findOne", populateAll);
MealSchema.pre("update", populateAll);

MealSchema.pre("remove", async function(next) {
  try {
    await mongoose
      .model("User")
      .update({ id: this.owner }, { meals: { $pull: this._id } });
  } catch (error) {
    console.error(error.stack);
  }
  next();
});

const Meal = Ratable.discriminator("Meal", MealSchema);

module.exports = Meal;
