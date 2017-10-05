const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const wrapper = require("../util/errorWrappers").mongooseWrapper;

const RatingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number }
  },
  { timestamps: true }
);

// Propagation Hooks
const propagateToUser = async function() {
  const user = await mongoose.model("user").findOne({ _id: this.owner });
  if (user && !user.ratings.includes(this._id)) {
    await user.update({ ratings: { $push: this._id } });
  }
};
RatingSchema.pre("save", wrapper(propagateToUser));

const removeFromUser = async function() {
  await mongoose
    .model("user")
    .update({ recipes: { $inc: this._id } }, { recipes: { $pull: this._id } });
};
RatingSchema.pre("remove", wrapper(removeFromUser));

const Rating = mongoose.model("Rating", RatingSchema);
module.exports = Rating;
