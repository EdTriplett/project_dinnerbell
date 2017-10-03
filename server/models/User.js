const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    kind: String,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    googleID: { type: String, unique: true },
    facebookID: { type: String, unique: true },
    passwordHash: { type: String, select: false },
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    ratings: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    // meals we have created
    meals: [{ type: Schema.Types.ObjectId, ref: "Meal" }],
    // users we are following
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    public: { type: Boolean, default: true },
    profilePicture: { type: Schema.Types.ObjectId, ref: "Picture" }
  },
  { timestamps: true }
);

UserSchema.virtual("password").set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 12);
});

UserSchema.methods.verifyPassword = function(password) {
  return this.passwordHash && bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.pre("remove", function(next) {
  mongoose
    .model("Rating")
    .remove({ user: this._id })
    .then(() => next())
    .catch(e => {
      console.error(e.stack);
      next();
    });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
