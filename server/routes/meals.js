const router = require("express").Router();
const Meal = require("../models/Meal");
const wrapper = require("../util/errorWrappers").expressWrapper;

// Route Handlers
const getMeals = async (req, res) => {
  res.json(await Meal.find());
};

const getMeal = async (req, res) => {
  const meal = await Meal.find({ id: req.params.id });
  res.json({ meal });
};

const updateMeal = async (req, res) => {
  res.json({ warning: "not implemented" });
};

const removeMeal = async (req, res) => {
  const meal = await Meal.remove({ id: params.id });
  res.json(meal);
};

// Register Route Handlers
router.get("/", wrapper(getMeals));
router.get("/:id", wrapper(getMeal));
router.patch("/:id", wrapper(updateMeal));
router.delete("/:id", wrapper(removeMeal));

module.exports = router;
