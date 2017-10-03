const router = require("express").Router();

const authCallback = (req, res) => {
  // todo: sanitize user object
  res.json(req.user);
};

const auth = passport => {
  router.get("/google/callback", (req, res) => {
    passport.authenticate("google", {
      scope: null
    }), authCallback;
  });
  router.get("/facebook/callback", (req, res) => {
    passport.authenticate("facebook", {
      scope: null
    }), authCallback;
  });
  router.get("/google", (req, res) => {
    passport.authenticate("google", {
      scope: null
    }), authCallback;
  });
  router.get("/facebook", (req, res) => {
    passport.authenticate("facebook", {
      scope: null
    }), authCallback;
  });
  router.post("/login", passport.authenticate("local"), authCallback);
  router.post("/register", async (req, res, next) => {
    try {
      const { username, password, email } = req.body;
      const user = await User.create({
        username,
        email,
        password
      });
      // todo: server-side validation on username, email, & password
      req.user = user;
      authCallback(req, res);
    } catch (e) {
      next(e);
    }
  });
};

module.exports = auth;
