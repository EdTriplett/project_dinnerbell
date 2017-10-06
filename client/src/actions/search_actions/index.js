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

export const setSearchPreferences = preferences => {
  return {
    type: searchConstants.SET_SEARCH_PREFERENCES,
    payload: preferences
  };
};

export const requestSearch = (query, preferences) => async dispatch => {
  try {
    query = (typeof query).toLowerCase() === "string" ? query : "";
    preferences = Array.isArray(preferences) ? preferences : [];
    dispatch(setSearchLoading(true));
    const url = `${searchConstants.BASE_URL}/recipes?q=${query}&preferences=${preferences.join(
      ","
    )}`;
    console.log("url: ", url);
    const payload = await AsyncManager.getRequest(url);
    dispatch(successSearchRequest(payload));
    dispatch(setSearchLoading(false));
  } catch (error) {
    // dispatch some error action
  }
};
