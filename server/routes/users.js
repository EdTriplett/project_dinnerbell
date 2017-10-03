const router = require("express").Router();
const User = require("../models/User");

router.get("/", async (req, res, next) => {
  try {
    let users = await User.find({ public: true });
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let user = await User.findById(id);
    res.json(user);
  } catch (e) {
    next(e);
  }
});
