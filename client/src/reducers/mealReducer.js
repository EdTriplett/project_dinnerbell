import mealConstants from "../constants/meal_constants";

const initialState = {
  meal: null,
  mealPicture: '',
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case mealConstants.SET_MEAL:

      return {
        ...state,
        meal: action.payload
      };

    case mealConstants.SET_MEAL_IMAGE:
      return { ...state.meal, 
        mealPicture: action.payload 
      };

    case mealConstants.CREATE_MEAL_REQUEST:
      return {
        ...state.meal,
        isLoading: action.payload
      }

    default:
      return state;
  }
};

