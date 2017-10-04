const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    name: String,
    ingredients: [String],
    kind: String,
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    preferences: [String],
    data: {
      /*response.hits.recipe.
    label,
    image
    uri
    url
    source
    yield
    ingredientLines
    calories
  digest (MAY have sub field, daily is %)
*/
    },
    image: { type: Schema.Types.ObjectId, ref: "Picture" }
  },
  { timestamps: true }
);

RecipeSchema.pre("save", async function(next) {
  try {
    const user = await mongoose.model("User").find({ _id: this.owner });
    if (user && user.recipes && !user.recipes.includes(this._id)) {
      await user.update({ recipes: { $push: this._id } });
    }
  } catch (error) {
    console.error(error.stack);
  }
  next();
});

RecipeSchema.pre("remove", async function(next) {
  try {
    await mongoose
      .model("User")
      .update(
        { recipes: { $inc: this._id } },
        { recipes: { $pull: this._id } }
      );
  } catch (error) {
    console.log(e.stack);
  }
  next();
});

RecipeSchema.pre("save", function(next) {
  const wordArray = this.ingredients.reduce((acc, line) => {
    return [...acc, ...line.split(" ")];
  });
  const wordSet = new Set(wordArray);
  this.wordList = [...wordSet.values()].join(" ");
  next();
});

RecipeSchema.index({ name: "text", wordList: "text" });

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
