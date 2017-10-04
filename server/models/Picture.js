const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PictureSchema = new Schema(
  {
    pictured: {
      kind: String,
      item: { type: Schema.Types.ObjectId, ref: "Recipe" }
    },
    url: String,
    key: String
  },
  { timestamps: true }
);

PictureSchema.pre("remove", async function(next) {
  try {
    mongoose.model("User").update({ user: this._id });
  } catch (error) {
    console.error(error.stack);
  }
  next();
});

const Picture = mongoose.model("Picture", PictureSchema);

module.exports = Picture;
