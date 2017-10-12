const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Ratable = require("./Ratable");
const wrapper = require("../util/errorWrappers").mongooseWrapper;

const MealSchema = new Schema(
  {
    kind: String,
    name: { type: String, index: true },
    date: Date,
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
  this.populate("recipes ratings");
  this.populate({
    path: "owner",
    select: "username email profilePicture _id"
  });
  this.populate({
    path: "registeredGuests",
    select: "username email profilePicture _id"
  });

  next();
};
MealSchema.pre("find", populateAll);
MealSchema.pre("findOne", populateAll);
MealSchema.pre("update", populateAll);

// Propagation Hooks
const propagateToUsers = async function() {
  await Promise.all([
    mongoose
      .model("User")
      .update(
        { _id: this.owner, meals: { $ne: this._id } },
        { $push: { meals: this._id } }
      ),
    mongoose.model("User").update(
      {
        _id: { $in: this.registeredGuests },
        registeredMeals: { $ne: this._id }
      },
      { $push: { registeredMeals: this._id } }
    )
  ]);
};
MealSchema.pre("save", wrapper(propagateToUsers));

const removeFromUsers = async function() {
  await Promise.all([
    mongoose
      .model("User")
      .update({ _id: this.owner }, { $pull: { meals: this._id } }),
    mongoose
      .model("User")
      .update(
        { _id: { $in: this.registeredGuests } },
        { $pull: { registeredMeals: this._id } }
      )
  ]);
};
MealSchema.pre("remove", wrapper(removeFromUsers));

const Meal = Ratable.discriminator("Meal", MealSchema);

module.exports = Meal;
