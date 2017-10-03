const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    googleID: { type: String, unique: true },
    facebookID: { type: String, unique: true },
    passwordHash: { type: String, select: false },
    recipes: [{ type: Schema.types.ObjectId, ref: "Recipe" }],
    meals: [{ type: Schema.types.ObjectId, ref: "Meal" }],
    following: [{ type: Schema.types.ObjectId, ref: "User" }],
    public: { type: Boolean, default: true }
  },
  { timestamps: true }
);

UserSchema.virtual("password").set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 12);
});

UserSchema.methods.verifyPassword = function(password) {
  return this.passwordHash && bcrypt.compareSync(password, this.passwordHash);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
