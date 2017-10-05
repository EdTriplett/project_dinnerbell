const router = require("express").Router();
const Rating = require("../models/Rating");
const wrapper = require("../util/errorWrappers").expressWrapper;

// Route Handlers
const getRatings = async (req, res) => {
  res.json(await Rating.find());
};

const getRating = async (req, res) => {
  const rating = await Rating.find({ id: req.params.id });
  res.json({ rating });
};

const updateRating = async (req, res) => {
  const rating = await Rating.update(
    { id: req.params.id },
    { rating: req.body.rating },
    { new: true }
  );
  res.json(rating);
};

const removeRating = async (req, res) => {
  const rating = await Rating.remove({ id: params.id });
  res.json(rating);
};

// Register Route Handlers
router.get("/", wrapper(getRatings));
router.get("/:id", wrapper(getRating));
router.patch("/:id", wrapper(updateRating));
router.delete("/:id", wrapper(removeRating));

module.exports = router;
