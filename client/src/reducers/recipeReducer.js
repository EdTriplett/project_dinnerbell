import recipeConstants from "../constants/recipe_constants";

const initialState = {
  isSearching: false,
  recipe: null
};

export default (state = initialState, action = {}) => {
  let updated = Object.assign({}, state);
  switch (action.type) {
    case recipeConstants.SET_RECIPE_LOADING:
      updated.isSearching = action.payload;

      return updated;

    case recipeConstants.SUCCESS_FIND_OR_CREATE_RECIPE:
      updated.recipe = action.payload;

      return updated;

    default:
      return updated;
  }
};
