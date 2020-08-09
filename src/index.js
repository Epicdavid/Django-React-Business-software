
import React from "react";
import ReactDOM from "react-dom";
import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.1.0";
import "assets/demo/demo.css";

import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider, connect } from "react-redux";
import authReducer from "./store/reducers/auth";
import orderReducer from "./store/reducers/orders";
import productReducer from "./store/reducers/products";
import statReducer from "./store/reducers/stats";
import chartReducer from "./store/reducers/chart";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";





import Index from "views/Index.js";
import LandingPage from "views/examples/LandingPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import LoginPage from "views/examples/login.js";
import Rates from "views/examples/Rates.js";
import VerifyPage from "views/examples/Verify.js";
import ForgotPass from "views/examples/ForgotPassword.js";
import PassReset from "views/examples/PasswordReset.js";
import EmailSent from "views/examples/youremailSent.js";


import "assets/css/loader.css";






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
    <BrowserRouter>
      <Switch>
        <Route
          path="/landing-page"
          render={props => <LandingPage {...props} />}
        />
        <Route path="/Rates" render={props => <Rates {...props} />} />
        <Route path="/your-email-sent" render={props => <EmailSent {...props} />} />
        <Route
          path="/register-page"
          render={props => <RegisterPage {...props} />}
        />
        <Route path="/password-reset/confirm/:uid/:token" render={props => <PassReset {...props} />} />
        <Route
          path="/profile-page"
          render={props => <ProfilePage {...props} />}
        />
        <Route
          path="/rest-auth/registration/account-confirm-email/:token"
          render={props => <VerifyPage {...props} />}
        />
        <Route
          path="/login-page"
          render={props => <LoginPage {...props} />}
        />
        <Route
          path="/password/reset"
          render={props => <ForgotPass {...props} />}
        />


        <Redirect from="/" to="/landing-page" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
