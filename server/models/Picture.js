const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const wrapper = require("../util/errorWrappers").mongooseWrapper;

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

// Propagation Hooks
const propagateToPictured = async function(next) {
  mongoose.model(this.pictured.kind).update({ user: this._id });
};
PictureSchema.pre("save", wrapper(propagateToPictured));

const Picture = mongoose.model("Picture", PictureSchema);

module.exports = Picture;
