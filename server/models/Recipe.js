const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sanitizer = require("../util/sparseSanitize")([
  "edamamId",
  "name",
  "ingredients",
  "preferences",
  "uri",
  "url",
  "source",
  "serves",
  "image"
]);
const Ratable = require("./Ratable");
const wrapper = require("../util/errorWrappers").mongooseWrapper;

const RecipeSchema = new Schema(
  {
    edamamId: { type: String, required: true, unique: true },
    kind: String,
    name: { type: String, index: true },
    ingredients: [String],
    preferences: [String],
    uri: String,
    url: String,
    source: String,
    digest: [Object],
    calories: Number,
    serves: Number,
    image: { type: String, default: null },
    recipePicture: { type: String, default: null },
    wordList: String,
    ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }]
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
  console.log("new recipe: ", props);
  return await this.create(props);
};

// Propagation Hooks
const propagateToOwner = async function() {
  if (
    this.owner &&
    this.owner.recipes &&
    !this.owner.recipes.includes(this._id)
  ) {
    this.owner.recipes.push(this._id);
    await this.owner.save();
  }
};
RecipeSchema.pre("save", wrapper(propagateToOwner));

const removeFromOwner = async function() {
  await mongoose
    .model("User")
    .update(
      { recipes: { $elemMatch: this._id } },
      { $pull: { recipes: this._id } }
    );
};
RecipeSchema.pre("remove", wrapper(removeFromOwner));

const populateAll = function(next) {
  this.populate("image owner ratings");
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
