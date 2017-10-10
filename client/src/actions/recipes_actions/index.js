import recipesConstants from "../../constants/recipes_constants";
import AsyncManager from "../../services/AsyncManager";

export const setRecipesLoading = bool => {
  return {
    type: recipesConstants.SET_RECIPES_LOADING,
    payload: bool
  };
};

export const successRecipesRequest = data => {
  return {
    type: recipesConstants.SUCCESS_RECIPES_REQUEST,
    payload: data
  };
};

export const setRecipesQuery = query => {
  return {
    type: recipesConstants.SET_RECIPES_QUERY,
    payload: query
  };
};

export const setRecipesPreferences = preferences => {
  return {
    type: recipesConstants.SET_RECIPES_PREFERENCES,
    payload: preferences
  };
};

export const requestRecipes = (query, preferences) => async dispatch => {
  try {
    query = (typeof query).toLowerCase() === "string" ? query : "";
    preferences = Array.isArray(preferences) ? preferences : [];
    dispatch(setRecipesLoading(true));
    dispatch(setRecipesPreferences(preferences));
    const url = `api/recipes?q=${query}&preferences=${preferences.join(",")}`;
    const payload = await AsyncManager.getRequest(url);

    dispatch(successRecipesRequest(payload));
    dispatch(setRecipesLoading(false));
  } catch (error) {}
};
