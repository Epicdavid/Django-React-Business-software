
import React from "react";
import ReactDOM from "react-dom";
import App from "./views/App";

import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider, } from "react-redux";
import reducer from "./store/reducers/auth";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.1.0";
import "assets/demo/demo.css";





const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhances(applyMiddleware(thunk)))





ReactDOM.render(

  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
