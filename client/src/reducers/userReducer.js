import userConstants from "../constants/user_constants";

const initialState = {
  user: null,
  userLoading: false,
  userError: null,
  isLoggedIn: false
};

export default (state = initialState, action = {}) => {
  let updated = Object.assign({}, state);

  switch (action.type) {
    case userConstants.SET_USER_LOADING:
      updated.userLoading = action.payload;

      return updated;

    case userConstants.SET_CURRENT_USER:
      updated.user = action.payload;

      return updated;

    case userConstants.SET_USER_ERROR:
      updated.userError = action.payload;
      updated.isLoggedIn = false;
      updated.user = null;

    case userConstants.SET_USER_STATUS:
      updated.isLoggedIn = action.payload;
      if (!updated.isLoggedIn) {
        updated.user = null;
      }

      return updated;

    default:
      return updated;
  }
};
