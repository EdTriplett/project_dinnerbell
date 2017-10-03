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

const Meal = mongoose.model("Meal", MealSchema);

module.exports = Meal;
