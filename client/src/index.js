import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import "font-awesome/css/font-awesome.css";
import { unregister } from "./registerServiceWorker";
import configureStore from "./store";
import { Provider } from "react-redux";

const app = (
  <Provider store={configureStore()}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
unregister();
