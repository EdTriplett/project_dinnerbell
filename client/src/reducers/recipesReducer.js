import recipesConstants from "../constants/recipes_constants";

const initialState = {
  isSearching: false,
  query: "",
  preferences: [],
  results: null
};

export default (state = initialState, action = {}) => {
  let updated = Object.assign({}, state);

  switch (action.type) {
    case recipesConstants.SET_RECIPES_QUERY:
      updated.query = action.payload;

      return updated;

    case recipesConstants.SET_RECIPES_PREFERENCES:
      updated.preferences = action.payload;

      return updated;

    case recipesConstants.SUCCESS_RECIPES_REQUEST:
      updated.results = action.payload;

      return updated;

    case recipesConstants.SET_RECIPES_LOADING:
      updated.isSearching = action.payload;

      return updated;

    default:
      return updated;
  }
};
