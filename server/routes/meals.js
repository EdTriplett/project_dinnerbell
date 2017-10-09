const router = require("express").Router();
const Meal = require("../models/Meal");
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
  res.json(await Meal.find());
};

const getMeal = async (req, res) => {
  res.json({ warning: "not implemented" });
};

const updateMeal = async (req, res) => {
  res.json({ warning: "not implemented" });
};

const removeMeal = async (req, res) => {
  res.json({ warning: "not implemented" });
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
router.get("/:id", wrapper(getMeal));
router.patch("/:id", wrapper(updateMeal));
router.delete("/:id", wrapper(removeMeal));
router.post("/picture", allowed, uploadMw, wrapper(addPicture));

module.exports = router;
