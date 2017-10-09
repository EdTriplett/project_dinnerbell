const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Ratable = require("./Ratable");
const wrapper = require("../util/errorWrappers").mongooseWrapper;

const MealSchema = new Schema(
  {
    kind: String,
    name: { type: String, index: true },
    date: Number,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    unregisteredGuests: [String],
    registeredGuests: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tasks: [String],
    ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
    image: String
  },
  {
    timestamps: true,
    discriminatorKey: "ratable"
  }
);

// Auto-Population
const populateAll = function(next) {
  this.populate("recipes owner ratings registeredGuests");
  next();
};
MealSchema.pre("find", populateAll);
MealSchema.pre("findOne", populateAll);
MealSchema.pre("update", populateAll);

// Propagation Hooks
const propagateToOwner = async function() {
  if (this.owner && this.owner.meals && !this.owner.meals.includes(this._id)) {
    this.owner.meals.push(this._id);
    await this.owner.save();
  }
};
MealSchema.pre("save", wrapper(propagateToOwner));

const removeFromOwner = async function() {
  await mongoose
    .model("User")
    .update({ _id: this.owner }, { $pull: { meals: this._id } });
};
MealSchema.pre("remove", wrapper(removeFromOwner));

const Meal = Ratable.discriminator("Meal", MealSchema);

module.exports = Meal;
