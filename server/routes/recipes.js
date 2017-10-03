const router = require("express").Router();
const fetch = require("isomorphic-fetch");

const BASE = "https://api.edamam.com/search";
const ID = process.env.EDAMAM_ID;
const KEY = process.env.EDAMAM_KEY;

const buildURL = params => {
  `${BASE}?app_id=${ID}&app_key=${KEY}&${params.join("&")}`;
};

router.get("/", async (req, res, next) => {
  try {
    const { q } = req.query;
    const response = await fetch(buildURL([`q=${q}`]));
    const recipes = await response.json();
    console.log(recipes);
    res.json(recipes);
  } catch (error) {
    next(error);
  }
});
