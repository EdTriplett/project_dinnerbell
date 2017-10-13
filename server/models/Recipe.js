const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sanitizer = require("../util/sparseSanitize")([
  "edamamId",
  "name",
  "ingredients",
  "preferences",
  "url",
  "source",
  "digest",
  "calories",
  "serves",
  "image"
]);
const Ratable = require("./Ratable");
const wrapper = require("../util/errorWrappers").mongooseWrapper;

const RecipeSchema = new Schema(
  {
    edamamId: { type: String, required: true },
    kind: String,
    name: { type: String, index: true },
    ingredients: [String],
    preferences: [String],
    url: String,
    source: String,
    digest: Array,
    calories: Number,
    serves: Number,
    image: { type: String, default: null },
    wordList: String
  },
  {
    timestamps: true,
    discriminatorKey: "ratable"
  }
);

// Sanitized Create/Update
RecipeSchema.statics.sparseUpdate = async function(id, newProps) {
  const props = sanitizer(newProps);
  return await this.update({ _id: id }, props, { new: true });
};

RecipeSchema.statics.sparseCreate = async function(newProps) {
  const props = sanitizer(newProps);
  const exists = await this.findOne({ edamamId: props.edamamId });
  if (!exists) {
    return await this.create(props);
  }
};

const populateAll = function(next) {
  this.populate("ratings");
  next();
};
RecipeSchema.pre("find", populateAll);
RecipeSchema.pre("findOne", populateAll);
RecipeSchema.pre("update", populateAll);

// Build wordList for Search
RecipeSchema.pre("save", function(next) {
  if (this.ingredients && this.ingredients.length) {
    const wordArray = this.ingredients.reduce((acc, line) => {
      return [...acc, ...line.split(" ")];
    }, []);
    const wordSet = new Set(wordArray);
    this.wordList = [...wordSet.values()]
      .map(word => word.toLowerCase())
      .join(" ");
  } else {
    this.wordList = "";
  }
  next();
});
RecipeSchema.index({ name: "text", wordList: "text" });

const Recipe = Ratable.discriminator("Recipe", RecipeSchema);
module.exports = Recipe;
