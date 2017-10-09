import mealConstants from "../constants/meal_constants";

const initialState = {
  meal: null
};

const mealReducer = (state = initialState, action) => {
  switch (action.type) {
    case mealConstants.SET_MEAL:
      return {
        ...state,
        meal: action.payload
      };
    default:
      return state;
  }
};

export default mealReducer;
