const router = require("express").Router();
const Rating = require("../models/Rating");

router.get("/", async (req, res, next) => {
  try {
    res.json(await Rating.find());
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const rating = await Rating.find({id: params.id})
    res.json({ rating });
  } catch (error) {
    next(error);
  }
});


router.patch("/:id", async (req, res, next) => {
  try {
    const rating = await Rating.update({id: params.id}, {rating: req.body.rating}, {new: true})
    res.json(rating);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const rating = await Rating.remove({id: params.id})
    res.json(rating);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
