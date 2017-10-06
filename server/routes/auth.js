const router = require("express").Router();
const User = require("../models/User");
const wrapper = require("../util/errorWrappers").expressWrapper;

const REDIRECTS = {
  successRedirect: "http://localhost:3000/search",
  failureRedirect: "http://localhost:3000/login"
};

const auth = passport => {
  // User redirect routes, must redirect back to the front-end!
  router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile"] })
  );
  router.get("/google/callback", passport.authenticate("google", REDIRECTS));

  router.get("/facebook", passport.authenticate("facebook"));
  router.get(
    "/facebook/callback",
    passport.authenticate("facebook", REDIRECTS)
  );

  // Redirect back to the frontend on passport errors
  router.use((err, req, res, next) => {
    err =
      err.name === "ValidationError" ? "Warning, username already taken" : err;
    req.session.user = { errors: [err] };
    res.redirect(REDIRECTS.failureRedirect);
  });

  router.get("/current-user", (req, res) => {
    res.json(req.session.user);
    if (req.session.user && req.session.user.error) {
      req.session.user = null;
    }
  });

  router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json(req.session.user);
  });

  const register = async (req, res) => {
    const { password, email } = req.body;
    const user = await User.createLocalUser({ email, password });
    if (!user.errors) {
      req.session.user = user;
    }
    res.json(user);
  };
  router.post("/register", wrapper(register));

  router.all("/logout", (req, res) => {
    req.session.destroy();
    req.logout();
    res.json({ message: "logged out" });
  });

  return router;
};

module.exports = auth;
