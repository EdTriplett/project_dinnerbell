const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validate = require("validate.js");

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
    profilePicture: { type: Schema.Types.ObjectId, ref: "Picture" },
    dietaryRestrictions: [String]
  },
  { timestamps: true }
);

const constraints = {
  username: {
    presence: true
  },
  email: {
    presence: true,
    email: true,
    message: "Not a valid email address."
  },
  password: {
    presence: true,
    minimum: 6,
    message: "Password must be at least six characters."
  }
};

UserSchema.statics.createLocalUser = async function(fields) {
  const results = validate(fields, constraints);
  return results ? results : mongoose.models("User").create(fields);
};

UserSchema.methods.updateUser = async function(fields) {
  const results = Object.entries(fields).map((field, value) => {
    validate.single(value, constraints[field]);
  });
  return results ? { errors: results } : this.update(fields);
};

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

const populateAll = function() {
  this.populate("recipes meals profilePicture following ratings");
};

UserSchema.pre("find", populateAll);

UserSchema.pre("findOne", populateAll);

UserSchema.pre("update", populateAll);

const User = mongoose.model("User", UserSchema);

module.exports = User;
