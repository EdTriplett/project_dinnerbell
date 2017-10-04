import userConstants from "../../constants/user_constants";
import AsyncManager from "../../services/AsyncManager";

export function setUserLoading(bool) {
  return {
    type: userConstants.SET_USER_LOADING,
    payload: bool
  };
}

export function registerUser(data) {
  return dispatch => {
    dispatch(setUserLoading(true));

    return dispatch(
      AsyncManager.postRequest(
        "/auth/register",
        data,
        userConstants.SET_CURRENT_USER,
        () => {
          dispatch(setUserLoading(false));
        }
      )
    );
  };
}

export function loginUser(data) {
  return dispatch => {
    dispatch(setUserLoading(true));

    return dispatch(
      AsyncManager.postRequest(
        "/auth/login",
        data,
        userConstants.SET_CURRENT_USER,
        () => {
          dispatch(setUserLoading(false));
        }
      )
    );
  };
}

// export function testSearch() {
// 	return dispatch => {
// 		dispatch(setTestLoading(true));
// 		return dispatch(
// 			AsyncManager.getRequest(
// 				'https://swapi.co/api/planets/1/?format=wookiee',
// 				null,
// 				searchConstants.TEST_FETCH,
// 				() => {
// 					dispatch(setTestLoading(false));
// 				}
// 			)
// 		);
// 	};
// }

// export function loginUserSuccess() {
// 	return dispatch => {
// 		dispatch(setLoginUserLoading(true));

// 		return dispatch(AsyncManager.postRequest('/register', ));
// 	};
// }
