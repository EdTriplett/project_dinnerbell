const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sanitizer = require('../util/sparseSanitize')(['name', 'ingredients', 'preferences', 'uri', 'url', 'source', 'serves', 'image'])
const Ratable = require('./Ratable')

const RecipeSchema = new Schema(
  {
    name: String,
    ingredients: [String],
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    preferences: [String],
    uri: String,
    url: String,
    source: String,
    digest: [Object],
    calories: Number,
    serves: Number,
    image: { type: Schema.Types.ObjectId, ref: "Picture" },
    wordList: String,
    ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
  },
  { timestamps: true,
  discriminatorKey: 'ratable' }
);

RecipeSchema.statics.sparseUpdate = async function(id, newProps) {
  const props = sanitizer(newProps)
  return await this.update({_id:id}, props, {new:true})
}

RecipeSchema.statics.sparseCreate = async function(newProps) {
  const props = sanitizer(newProps)
  return await this.create(props)
}

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

// const populateAll = function(next) {
//    this.populate("image owner ratings");
//   next();
// };
// RecipeSchema.pre("find", populateAll);
// RecipeSchema.pre("findOne", populateAll);
// RecipeSchema.pre("update", populateAll);

RecipeSchema.pre("remove", async function(next) {
  try {
    await mongoose
      .model("User")
      .update(
        { recipes: { $elemMatch: this._id } },
        { $pull: { recipes: this._id } }
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

const Recipe = Ratable.discriminator("Recipe", RecipeSchema);

module.exports = Recipe;
