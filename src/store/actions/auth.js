import axios from "axios";
import * as url from "./config";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user
  };
};

export const authFail = (detail) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: detail,
    detail: null,
  };
};

export const logout = () => {
  localStorage.removeItem("user");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const user = {
      email, password
    }
    axios
      .post(url.BASE_URL + "rest-auth/login/", user)
      .then(res => {
        if (res.data.key) {
          const user = {
            token: res.data.key,
            username: res.data.user_detail.username,
            expirationDate: new Date(new Date().getTime() + 3600 * 1000),
            userId: res.data.user,
            btc_wallet: res.data.user_detail.btc_wallet,
            balance: res.data.user_detail.balance,
            hash: res.data.user_detail.hash,
          }
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(authSuccess(user));
          dispatch(checkAuthTimeout(3600));
        }
        if (res.data.error) {
          const detail = {
            detail: res.data.error
          }
          dispatch(authFail(detail));
        }

      })
      .catch(fail => {
        console.log(fail)
        dispatch(authFail());
      });
  };
};

export const authSignup = (username, email, password1, password2, btc_wallet) => {
  return dispatch => {
    dispatch(authStart());
    const user = {
      username, email, password1, password2, btc_wallet,
    };
    axios
      .post(url.BASE_URL + "rest-auth/registration/", user)
      .then(res => {
        console.log(res)
        if (res.data.detail) {
          const user = {
            detail: res.data.detail,
            username,
            email,
            expirationDate: new Date(new Date().getTime() + 3600 * 1000),

          }
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(authSuccess(user));
          dispatch(checkAuthTimeout(3600));
        }

        if (res.data.error) {
          const detail = {
            detail: res.data.error
          }
          dispatch(authFail(detail));
        }
      })
      .catch(fail => {
        console.log(fail);
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined || user === null) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
