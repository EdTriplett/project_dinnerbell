const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatableSchema = new Schema(
  {
    ratings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rating"
      }
    ]
  },
  {
    timestamps: true,
    discriminatorKey: "ratable"
  }
);

RatableSchema.virtual("rating").get(() => {
  if (this.ratings.length) {
    let total = this.ratings.reduce((sum, rating) => {
      return (sum += rating);
    }, 0);
    return Math.round(total / this.ratings.length);
  }
});

var Ratable = mongoose.model("Ratable", RatableSchema);
module.exports = Ratable;
