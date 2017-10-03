const router = require("express").Router();
const fetch = require("isomorphic-fetch");

const BASE = "https://api.edamam.com/search";
const ID = process.env.EDAMAM_ID;
const KEY = process.env.EDAMAM_KEY;

const buildURL = params =>
  `${BASE}?app_id=${ID}&app_key=${KEY}&${params.join("&")}`;

const DIET = new Set(["balanced", "high-protein", "low-fat", "low-carb"]);
const HEALTH = new Set([
  "vegan",
  "vegetarian",
  "sugar-conscious",
  "peanut-free",
  "tree-nut-free",
  "alcohol-free"
]);

const buildPrefs = preferences => {
  let queries = [];

  if (preferences) {
    let { health, diet } = preferences.split(",").reduce((prefs, current) => {
      if (DIET.has(current)) prefs.diet.push(current);
      if (HEALTH.has(current)) prefs.health.push(current);
      return prefs;
    },
    {
      health: [],
      diet: []
    });

    if (health.length) queries.push(`health=${health.join("&health=")}`);
    if (diet.length) queries.push(`diet=${diet.join("&diet=")}`);
  }

  return queries;
};

router.get("/", async (req, res, next) => {
  try {
    const { q, preferences } = req.query;

    const response = await fetch(
      buildURL([`q=${q}`, ...buildPrefs(preferences)])
    );
    const recipes = await response.json();
    res.json(recipes);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.json({ warning: "not implemented" });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    res.json({ warning: "not implemented" });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    res.json({ warning: "not implemented" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
