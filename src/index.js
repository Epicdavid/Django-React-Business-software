
import React from "react";
import ReactDOM from "react-dom";
import App from "./views/App";

import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider, } from "react-redux";
import authReducer from "./store/reducers/auth";
import orderReducer from "./store/reducers/orders";
import productReducer from "./store/reducers/products";
import statReducer from "./store/reducers/stats";
import chartReducer from "./store/reducers/chart";

/*!import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.1.0";
import "assets/demo/demo.css";
*/

import "assets/admin/scss/black-dashboard-react.scss";
import "assets/admin/demo/demo.css";
import "assets/admin/css/nucleo-icons.css";


const rootReducer = combineReducers({
  auth: authReducer,
  orders: orderReducer,
  products: productReducer,
  stats: statReducer,
  chart: chartReducer
})


const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)))





ReactDOM.render(

  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
