const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    name: String,
    ingredients: [String],
    kind: String,
    owner: { type: Schema.types.ObjectId, ref: "User", required: true },
    nutrition: {}
  },
  { timestamps: true }
);

RecipeSchema.pre("save", async function(next) {
  try {
    const user = await mongoose.model("user").findById(this.owner);
    if (user && !user.recipes.includes(this._id)) {
      await user.update({ recipes: { $push: this._id } });
    }
    next();
  } catch (error) {
    console.error(error);
    next();
  }
});

RecipeSchema.pre("remove", function(next) {
  mongoose
    .model("User")
    .update({ recipes: { $inc: this._id } }, { recipes: { $pull: this._id } })
    .then(() => next())
    .catch(e => {
      console.log(e.stack);
      next();
    });
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
