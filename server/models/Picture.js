const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

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

PictureSchema.pre("remove", function(next) {
  mongoose
    .model("User")
    .update({ user: this._id })
    .then(() => next())
    .catch(e => {
      console.error(e.stack);
      next();
    });
});

const Picture = mongoose.model("Picture", PictureSchema);

module.exports = Picture;
