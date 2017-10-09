const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validate = require("validate.js");
const wrapper = require("../util/errorWrappers").mongooseWrapper;

const UserSchema = new Schema(
  {
    kind: String,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    profilePicture: { type: String, default: null },
    googleID: { type: String, unique: true },
    facebookID: { type: String, unique: true },
    passwordHash: { type: String, select: false },
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
    // meals we have created
    meals: [{ type: Schema.Types.ObjectId, ref: "Meal" }],
    // users we are following
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    public: { type: Boolean, default: true },
    image: { type: Schema.Types.ObjectId, ref: "Picture", default: null },
    dietaryRestrictions: [String]
  },
  {
    timestamps: true,
    virtuals: true
  }
);

// Pretty error messages for violated unique constraints
UserSchema.plugin(uniqueValidator);

const constraints = {
  // username: {
  //   presence: true
  // },
  email: {
    presence: true,
    email: true
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: "must be at least 6 characters"
    }
  }
};

// Return a new user or an errors object if any constraints are violated
UserSchema.statics.createLocalUser = async function(fields) {
  const results = await validate(fields, constraints);
  return results ? results : mongoose.model("User").create(fields);
};

// Update and return a user, or an error object if any constraints are violated
UserSchema.statics.updateUser = async function(fields, _id) {
  const results = Object.entries(fields).reduce((acc, [field, value]) => {

    if (constraints[field]) {
      console.log('field = ', field, 'value = ', value)
      acc.push(validate.single(value, constraints[field]));
    }
    return acc;
  }, []);
  return results.length
    ? { errors: results }
    : await mongoose
        .model("User")
        .findOneAndUpdate({ _id }, fields, { new: true });
};

// Password management
UserSchema.virtual("password").set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 12);
});
UserSchema.methods.verifyPassword = function(password) {
  return this.passwordHash && bcrypt.compareSync(password, this.passwordHash);
};

// Remove ratings from deleted users
const removeRatings = async function() {
  await mongoose.model("Rating").remove({ user: this._id });
};
UserSchema.pre("remove", wrapper(removeRatings));

// Populate ALL THE FIELDS
const populateAll = function(next) {
  // this.populate("recipes meals image following ratings");
  next();
};
UserSchema.pre("find", populateAll);
UserSchema.pre("findOne", populateAll);
UserSchema.pre("update", populateAll);

UserSchema.index({
  googleID: 1,
  facebookID: 1,
  username: 1,
  email: 1
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
