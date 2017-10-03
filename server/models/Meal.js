const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MealSchema = new Schema(
  {
    name: String,
    kind: String,
    date: Number,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    unregisteredGuests: [String],
    registeredGuests: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tasks: [String]
  },
  { timestamps: true }
);

MealSchema.pre("remove", function(next) {
  mongoose
    .model("User")
    .update({ id: this.owner }, { meals: { $pull: this._id } })
    .then(() => next())
    .catch(e => {
      console.error(e.stack);
      next();
    });
});

const Meal = mongoose.model("Meal", MealSchema);

module.exports = Meal;
