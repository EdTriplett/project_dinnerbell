const BASE = "https://api.edamam.com/search";
const ID = process.env.EDAMAM_ID;
const KEY = process.env.EDAMAM_KEY;

const buildRecipeURL = params =>
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

const buildRecipePrefs = preferences => {
  let queries = [];

  if (preferences) {
    let { health, diet } = preferences.split(",").reduce((prefs, current) => {
      if (DIET.has(current)) prefs.diet.push(current);
      if (HEALTH.has(current)) prefs.health.push(current);
      return prefs;
    }, {
      health: [],
      diet: []
    });

    if (health.length) queries.push(`health=${health.join("&health=")}`);
    if (diet.length) queries.push(`diet=${diet.join("&diet=")}`);
  }

  return queries;
};

const _sanitizeRecipe = recipe => {
  let {
    label,
    image,
    uri,
    url,
    source,
    digest,
    ingredientLines,
    calories,
    dietLabels,
    healthLabels
  } = recipe.recipe;

  dietLabels = dietLabels ? dietLabels : [];

  healthLabels = healthLabels ? healthLabels : [];

  ingredientLines = ingredientLines.filter(word => {
    return word !== "undefined";
  });

  return {
    name: label,
    ingredients: ingredientLines,
    data: {
      uri,
      url,
      source,
      digest,
      calories
    },
    preferences: dietLabels.concat(healthLabels),
    image: { url: image }
  };
};

const sanitizeRecipes = apiResponse => {
  return apiResponse.hits.map(_sanitizeRecipe);
};

module.exports = {
  buildRecipePrefs,
  buildRecipeURL,
  sanitizeRecipes
};
