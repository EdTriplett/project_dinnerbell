import mealConstants from "../../constants/meal_constants";
import AsyncManager from "../../services/AsyncManager";

export const setMeal = meal => {
  return {
    type: mealConstants.SET_MEAL,
    payload: meal
  };
};

export const createMealRequest = meal => {
  return {
    type: mealConstants.CREATE_MEAL_REQUEST
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
    const response = await AsyncManager.uploadFile("/api/meals/picture", file);
    dispatch(setMealImage(response));
  } catch (e) {
    console.error(e.stack);
  }
};

export const getMeal = id => async dispatch => {
  try {
    const meal = await AsyncManager.getRequest(`/api/meals/${id}`);
    dispatch(setMeal(meal));
  } catch (err) {
    console.log(err.stack);
  }
};

export const createMeal = meal => async dispatch => {
  try {
    dispatch(createMealRequest(true));
    const response = await AsyncManager.postRequest(`/api/meals`, meal);
    console.log(response, 'this is the meal response!!')
    dispatch(createMealRequest(false));
  } catch (err) {
    console.log(err.stack);
  }
};
