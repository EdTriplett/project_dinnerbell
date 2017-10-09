
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import * as reducers from "./reducers";
import { reducer as formReducer } from "redux-form";

const rootReducers = {
  ...reducers,
  form: formReducer
};

export default () =>
  createStore(
    combineReducers(rootReducers),
    composeWithDevTools(applyMiddleware(thunk))
  );
