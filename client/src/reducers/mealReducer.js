import mealConstants from "../constants/meal_constants";

const initialState = {
  meal: null,
  mealPicture: ''
};

const mealReducer = (state = initialState, action) => {
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

    default:
      return state;
  }
};

export default mealReducer;
