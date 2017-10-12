const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const wrapper = require("../util/errorWrappers").mongooseWrapper;

const RatingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number },
    recipe: { type: Schema.Types.ObjectId, ref: "Recipe" }
  },
  { timestamps: true }
);

// Propagation Hooks
const propagateRatings = async function() {
  await Promise.all([
    mongoose
      .model("User")
      .update(
        { _id: this.user, ratings: { $ne: this._id } },
        { $push: { ratings: this._id } }
      ),
    mongoose
      .model("Recipe")
      .update(
        { _id: this.recipe, ratings: { $ne: this._id } },
        { $push: { ratings: this._id } }
      )
  ]);
};
RatingSchema.pre("save", wrapper(propagateRatings));

const removeRatings = async function() {
  await Promise.all([
    mongoose
      .model("User")
      .update(
        { _id: this.user, ratings: this._id },
        { $pull: { ratings: this._id } }
      ),
    mongoose
      .model("Recipe")
      .update(
        { _id: this.recipe, ratings: this._id },
        { $pull: { ratings: this._id } }
      )
  ]);
};
RatingSchema.pre("remove", wrapper(removeRatings));

const Rating = mongoose.model("Rating", RatingSchema);
module.exports = Rating;
