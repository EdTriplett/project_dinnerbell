const router = require("express").Router();
const User = require("../models/User");

const allowed = (req, res, next) => {
  if (req.isAuthenticated() && req.user.id === req.params.id) {
    next();
  }
  res.json({ error: "unauthorized user action" });
};

router.get("/", async (req, res, next) => {
  try {
    res.json(await User.find({ public: true }));
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    res.json(await User.findById(id));
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", allowed, async (req, res, next) => {
  try {
    const { user } = req.body;
    res.json(await req.user.update(user));
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", allowed, async (req, res, next) => {
  try {
    req.user.remove();
    req.logout();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
