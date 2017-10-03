const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    rated: {
      kind: String,
      item: { type: Schema.Types.ObjectId, refPath: "connections.kind" }
    },
    rating: { type: Number }
  },
  { timestamps: true }
);

RatingSchema.pre("save", async function(next) {
  try {
    const user = await mongoose.model("user").findById(this.owner);
    if (user && !user.ratings.includes(this._id)) {
      await user.update({ ratings: { $push: this._id } });
    }
    next();
  } catch (error) {
    console.error(error);
    next();
  }
});

RatingSchema.pre("remove", function(next) {
  mongoose
    .model("User")
    .update({ recipes: { $inc: this._id } }, { recipes: { $pull: this._id } })
    .then(() => next())
    .catch(e => {
      console.log(e.stack);
      next();
    });
});

const Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating;
