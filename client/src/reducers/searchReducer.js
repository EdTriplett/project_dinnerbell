import searchConstants from "../constants/search_constants";

const initialState = {
  isSearching: false,
  searchQuery: "",
  testing: false,
  testResults: null
};

export default (state = initialState, action = {}) => {
  let updated = Object.assign({}, state);

  switch (action.type) {
    case searchConstants.GET_SEARCH_REQUEST:
      updated.isSearching = true;

      return updated;

    case searchConstants.TEST_LOADING:
      updated.testing = action.payload;

      return updated;

    case searchConstants.TEST_FETCH:
      updated.testResults = action.payload;

      return updated;

    case searchConstants.SET_SEARCH_REQUEST:
      console.log("made it to serch request");
      updated.searchQuery = action.payload;

      return updated;

    default:
      return updated;
  }
};
