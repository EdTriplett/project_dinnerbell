import mealConstants from "../../constants/meal_constants";
import AsyncManager from "../../services/AsyncManager";

export const setMeal = meal => {
  return {
    type: mealConstants.SET_MEAL,
    payload: meal
  };
};

export const setMealImage = img => {
  return {
    type: mealConstants.SET_MEAL_IMAGE,
    payload: img
  };
};

export const setMealProfileImage = file => async dispatch => {
  try {
    console.log('get here????????')
    const response = await AsyncManager.uploadFile("/api/meals/picture", file);
    dispatch(setMealImage(response));
  } catch (e) {
    console.error(e.stack);
    // dispatch(setUserError(e.message));
  }
};

export const getMeal = id => async dispatch => {
  try {
    const meal = await AsyncManager.getRequest(`/api/meals/${id}`);
    dispatch(setMeal(meal));
  } catch (err) {
    console.log(err);
  }
};
