const router = require("express").Router();
const User = require("../models/User");

const REDIRECTS = {
  successRedirect: "http://localhost:3000/search",
  failureRedirect: "http://localhost:3000/login"
};

const auth = passport => {
  router.get("/current-user", (req, res) => res.json(req.session.user));

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
  router.use((err, req, res, next) => res.redirect(REDIRECTS.failureRedirect));

  router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json(req.session.user);
  });

  router.post("/register", async (req, res, next) => {
    try {
      const { username, password, email } = req.body;
      const user = await User.createLocalUser({
        username,
        email,
        password
      });
      if (!user.errors) {
        req.session.user = user;
      }

      res.json(user);
    } catch (e) {
      next(e);
    }
  });

  router.all("/logout", (req, res) => {
    req.session.destroy();
    req.logout();
    res.json({ message: "logged out" });
  });

  return router;
};

module.exports = auth;
