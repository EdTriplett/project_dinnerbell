import userConstants from "../constants/user_constants";

const initialState = {
  user: null,
  users: null,
  userLoading: false,
  userError: null
};

export default (state = initialState, action = {}) => {
  let updated = Object.assign({}, state);

  switch (action.type) {
    case userConstants.SET_USER_LOADING:
      updated.userLoading = action.payload;

      return updated;

    case userConstants.SET_CURRENT_USER:
      updated.user = action.payload;
      updated.userError = action.userError;

      return updated;

    case userConstants.SET_USER_ERROR:
      updated.userError = action.payload;
      updated.userLoading = false;
      updated.user = null;

      return updated;

    case userConstants.SET_ALL_USERS:
      updated.users = action.payload;

    default:
      return updated;
  }
};
