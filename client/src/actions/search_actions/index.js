import searchConstants from "../../constants/search_constants";
import AsyncManager from "../../services/AsyncManager";

export const setSearchLoading = bool => {
  return {
    type: searchConstants.SET_SEARCH_LOADING,
    payload: bool
  };
};

export const successSearchRequest = data => {
  return {
    type: searchConstants.SUCCESS_SEARCH_REQUEST,
    payload: data
  };
};

export const setSearchQuery = query => {
  return {
    type: searchConstants.SET_SEARCH_QUERY,
    payload: query
  };
};

export const requestSearch = () => async dispatch => {
  try {
    dispatch(setSearchLoading(true));
    const payload = await AsyncManager.getRequest(
      "http://localhost:3001/api/recipes?q=bro&preferences=super"
    );
    dispatch(successSearchRequest(payload));
    dispatch(setSearchLoading(false));
  } catch (error) {
    // dispatch some error action
  }
};
