// put in url of deployed server on Heroku in strategy callback urls

const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const buildUsername = require("./util/buildUsername");

const User = require("./models/User");

const localHandler = async (req, email, password, done) => {
  try {
    const user = await User.findOne({ email }, { passwordHash: 1 });

    if (user && user.verifyPassword(password)) {
      const newUser = await User.findOne({ _id: user._id });
      req.session.user = newUser;

      done(null, newUser);
    } else {
      req.session.user = null;
      done(null, false);
    }
  } catch (error) {
    console.error(error);
    done(error);
  }
};

const googleHandler = async (req, accessToken, refreshToken, profile, done) => {
  try {
    let user = req.session.user;
    if (user) {
      user = await User.findOne({
        _id: user.id
      }).update(
        {
          googleID: profile.id
        },
        { new: true }
      );
    }
    user = await User.findOne({ googleID: profile.id });
    if (!user) {
      user = await User.create({
        googleID: profile.id,
        username: buildUsername()
      });
    }

    req.session.user = user;
    done(null, user);
  } catch (error) {
    console.error(error);
    done(error);
  }
};

const facebookHandler = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    let user = req.session.user;
    if (user) {
      user = await User.findOne({
        _id: user.id
      }).update(
        {
          facebookID: profile.id
        },
        { new: true }
      );
    }
    user = await User.findOne({ facebookID: profile.id });
    if (!user) {
      user = await User.create({
        facebookID: profile.id,
        username: buildUsername()
      });
    }

    req.session.user = user;
    done(null, user);
  } catch (error) {
    console.error(error);
    done(error);
  }
};

const localOptions = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
};

let googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/google/callback",
  passReqToCallback: true
};

let facebookOptions = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/facebook/callback",
  passReqToCallback: true
};

if (process.env.NODE_ENV === "production") {
  googleOptions.callbackURL =
    "https://dinnerbell.herokuapp.com/auth/google/callback";
  facebookOptions.callbackURL =
    "https://dinnerbell.herokuapp.com/auth/facebook/callback";
}

const authenticate = passport => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((userid, done) => {
    User.findOne({ _id: userid }, (error, user) => {
      done(error, user);
    });
  });
  passport.use("local", new LocalStrategy(localOptions, localHandler));
  passport.use("google", new GoogleStrategy(googleOptions, googleHandler));
  passport.use(
    "facebook",
    new FacebookStrategy(facebookOptions, facebookHandler)
  );
};

module.exports = authenticate;
