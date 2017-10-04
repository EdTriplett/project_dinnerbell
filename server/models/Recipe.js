const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    name: String,
    ingredients: [String],
    kind: String,
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    preferences: [String],
    uri: String,
    url: String,
    source: String,
    digest: [Object],
    calories: Number,
    serves: Number,
    image: { type: Schema.Types.ObjectId, ref: "Picture" },
    wordList: String
  },
  { timestamps: true }
);

RecipeSchema.pre("save", async function(next) {
  try {
    if (
      this.owner &&
      this.owner.recipes &&
      !this.owner.recipes.includes(this._id)
    ) {
      this.owner.recipes.push(this._id);
      await this.owner.save();
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
  if (this.ingredients && this.ingredients.length) {
    const wordArray = this.ingredients.reduce((acc, line) => {
      return [...acc, ...line.split(" ")];
    }, []);
    const wordSet = new Set(wordArray);
    this.wordList = [...wordSet.values()].join(" ");
  } else {
    this.wordList = "";
  }
  next();
});

RecipeSchema.index({ name: "text", wordList: "text" });

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
