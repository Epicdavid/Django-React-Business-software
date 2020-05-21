
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducer from "./store/reducers/auth";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.1.0";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import LandingPage from "views/examples/LandingPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import LoginPage from "views/examples/login.js";
import Rates from "views/examples/Rates.js";


const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhances(applyMiddleware(thunk)))


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/components" render={props => <Index {...props} />} />
        <Route
          path="/landing-page"
          render={props => <LandingPage {...props} />}
        />
        <Route path="/rates" render={props => <Rates {...props} />} />
        <Route
          path="/register-page"
          render={props => <RegisterPage {...props} />}
        />
        <Route
          path="/profile-page"
          render={props => <ProfilePage {...props} />}
        />
        <Route
          path="/login-page"
          render={props => <LoginPage {...props} />}
        />
        <Redirect from="/" to="/landing-page" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
