const router = require("express").Router();
const Meal = require("../models/Meal");
const User = require("../models/User");
const wrapper = require("../util/errorWrappers").expressWrapper;
const FileUploader = require("../util/upload");
const uploadMw = FileUploader.single("photo");

const allowed = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.json({ error: "unauthorized user action" });
  }
};

// Route Handlers
const getMeals = async (req, res) => {
  const meals = await Meal.find();
  res.json({ meals });
};

const getMeal = async (req, res) => {
  const meal = await Meal.find({ _id: req.params.id });
  res.json({ meal });
};

const updateMeal = async (req, res) => {
  res.json({ warning: "not implemented" });
};

const addMeal = async (req, res) => {
  

  const data = {
    name: req.body.name,
    date: req.body.date,
    owner: req.body.owner,
    recipes: req.body.recipes,
    registeredGuests: req.body.registeredGuests,
    tasks: req.body.tasks,
    image: req.body.image
  }

  const meal = await Meal.create(data);

  console.log(meal, 'meal???? populating')

  res.json(meal);
}

const removeMeal = async (req, res) => {
  const meal = await Meal.remove({ id: params.id });
  res.json(meal);
};

const addPicture = async (req, res) => {
  const file = {
    data: req.file.buffer,
    name: req.file.originalname,
    mimetype: req.file.mimetype
  };

  const picture = await FileUploader.upload(file, null);

  res.json(picture.url);
};

// Register Route Handlers
router.get("/", wrapper(getMeals));
router.post("/", wrapper(addMeal));
router.get("/:id", wrapper(getMeal));
router.patch("/:id", wrapper(updateMeal));
router.delete("/:id", wrapper(removeMeal));
router.post("/picture", allowed, uploadMw, wrapper(addPicture));


module.exports = router;
