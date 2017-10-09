const router = require("express").Router();
const fetch = require("isomorphic-fetch");
const Recipe = require("../models/Recipe");
const {
  buildRecipePrefs,
  buildRecipeURL,
  sanitizeRecipes,
  buildDbQuery
} = require("../util/recipes");
const wrapper = require("../util/errorWrappers").expressWrapper;

// Route Handlers
const getRecipes = async (req, res) => {
  let { q, preferences } = req.query;
  preferences = preferences ? preferences : "";
  const queryPrefs = buildRecipePrefs(preferences);

  let apiResponse = await fetch(buildRecipeURL([`q=${q}`, ...queryPrefs]));
  apiResponse = sanitizeRecipes(await apiResponse.json());

  q = q ? q : "";
  const queryOpts = buildDbQuery(q.toLowerCase(), preferences);
  const dbResponse = await Recipe.find(queryOpts);
  res.json(dbResponse.concat(apiResponse));
};

const newRecipe = async (req, res) => {
  const recipe = await Recipe.sparseCreate(req.body);
  res.json(recipe);
};

const findOrCreateRecipe = async (req, res) => {
  let recipe;
  recipe = await Recipe.findOne({ edamamId: req.body.edamamId });
  if (!recipe) {
    recipe = await Recipe.sparseCreate(req.body);
  }
  console.log("recipe to send back: ", recipe);
  res.json(recipe);
};

const getRecipe = async (req, res) => {
  const recipe = await Recipe.find({ _id: req.params.id });
  res.json(recipe);
};

const updateRecipe = async (req, res) => {
  const recipe = await Recipe.sparseUpdate(req.params.id, req.body);
  res.json(recipe);
};

const removeRecipe = async (req, res) => {
  const recipe = await Recipe.remove({ _id: req.params.id });
  res.json(recipe);
};

// Register Route Handlers
router.get("/", wrapper(getRecipes));
// router.post("/", wrapper(newRecipe));
router.post("/", wrapper(findOrCreateRecipe));
router.get("/:id", wrapper(getRecipe));
router.patch("/:id", wrapper(updateRecipe));
router.delete("/:id", wrapper(removeRecipe));

module.exports = router;
