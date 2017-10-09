/*
image
edamamId

 */

const _addEdamamId = recipe => {
  let parsedURI = null;
  if (recipe.uri) {
    const lastSlash = recipe.uri.lastIndexOf("/");
    parsedURI = recipe.uri.slice(lastSlash + 1).split("_")[1];
  }
  recipe.edamamId = parsedURI;
};

const _changeImageUrl = recipe => {
  recipe.image = recipe instanceof Object ? recipe.image.url : recipe.image;
};

export const parseRecipe = recipe => {
  let modRecipe = Object.assign({}, recipe);
  _addEdamamId(modRecipe);
  _changeImageUrl(modRecipe);
  return modRecipe;
};
