import mealConstants from "../../constants/meal_constants";
import AsyncManager from "../../services/AsyncManager";

export const setMeal = meal => {
  return {
    type: mealConstants.SET_MEAL,
    payload: meal
  };
};

export const getMeal = id => async dispatch => {
  try {
    const meal = await AsyncManager.getRequest(`/api/meals/${id}`);
    dispatch(setMeal(meal));
  } catch (err) {
    console.log(err);
  }
};
