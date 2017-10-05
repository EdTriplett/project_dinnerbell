import searchConstants from "../constants/search_constants";

const initialState = {
  isSearching: false,
  query: "",
  results: null
};

export default (state = initialState, action = {}) => {
  let updated = Object.assign({}, state);

  switch (action.type) {
    case searchConstants.SET_SEARCH_QUERY:
      updated.query = action.payload;

      return updated;

    case searchConstants.SUCCESS_SEARCH_REQUEST:
      updated.results = action.payload;

      return updated;

    case searchConstants.SET_SEARCH_LOADING:
      updated.isSearching = action.payload;

      return updated;

    default:
      return updated;
  }
};
