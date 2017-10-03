const router = require("express").Router();
const User = require("../models/User");

const REDIRECTS = {
  successRedirect: "http://localhost:3000/search",
  failureRedirect: "http://localhost:3000/login"
};

const auth = passport => {
  router.get("/current-user", (req, res) => res.json(req.session.user));

  router.get("/google", passport.authenticate("google"));
  router.get(
    "/google/callback",
    passport.authenticate("google", { ...REDIRECTS, scope: null })
  );

  router.get("/facebook", passport.authenticate("facebook"));
  router.get(
    "/facebook/callback",
    passport.authenticate("facebook", { ...REDIRECTS, scope: null })
  );

  router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json(req.session.user);
  });

  router.post("/register", async (req, res, next) => {
    try {
      // todo: server-side validation on username, email, & password
      const { username, password, email } = req.body;
      const user = await User.create({
        username,
        email,
        password
      });

      req.session.user = user;
      res.json(user);
    } catch (e) {
      next(e);
    }
  });

  router.all("/logout", (req, res) => {
    req.logout();
    res.json({ message: "logged out" });
  });

  return router;
};

module.exports = auth;
