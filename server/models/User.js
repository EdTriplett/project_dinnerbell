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
    googleID: { type: String },
    facebookID: { type: String },
    passwordHash: { type: String, select: false },
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
    // meals we have created
    meals: [{ type: Schema.Types.ObjectId, ref: "Meal" }],
    // meals we are registered to
    registeredMeals: [{ type: Schema.Types.ObjectId, ref: "Meal" }],
    // users we are following
    image: { type: Schema.Types.ObjectId, ref: "Picture", default: null },
    dietaryRestrictions: [String]
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

// Pretty error messages for violated unique constraints
UserSchema.plugin(uniqueValidator);

const constraints = {
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
  if (results) {
    return results;
  } else {
    let newUser = await mongoose.model("User").create(fields);
    return await mongoose.model("User").findOne({ _id: newUser._id });
  }
};

// Update and return a user, or an error object if any constraints are violated
UserSchema.statics.updateUser = async function(fields, _id) {
  const results = Object.entries(fields).reduce((acc, [field, value]) => {
    if (constraints[field]) {
      const validation = validate.single(value, constraints[field]);
      validation && acc.push(validation);
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
  this.populate("recipes meals image following ratings registeredMeals");
  next();
};
UserSchema.pre("find", populateAll);
UserSchema.pre("findOne", populateAll);
UserSchema.pre("update", populateAll);
UserSchema.pre("findOneAndUpdate", populateAll);

UserSchema.index({
  googleID: 1,
  facebookID: 1,
  username: 1,
  email: 1
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
