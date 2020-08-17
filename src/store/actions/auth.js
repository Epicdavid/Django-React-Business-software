import axios from "axios";
import * as url from "./config";
import * as actionTypes from "./actionTypes";
import moment from 'moment';

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
  localStorage.removeItem("pMonths");
  localStorage.removeItem("pData");
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

  return async dispatch => {
    dispatch(authStart());
    const userx = {
      email, password
    }
    const pMonths = []
    const pData = []
    let user = {}
    await Promise.allSettled(
      [
        axios.post(url.BASE_URL + "rest-auth/login/", userx),
        axios.get('https://api.blockchain.info/charts/market-price?timespan=7days&cors=true')
      ]).then(axios.spread((res1, res2) => {

        if (res1.value.data.error) {
          const detail = {
            detail: res1.value.data.error
          }
          dispatch(authFail(detail));
        }
        user = {
          token: res1.value.data.key,
          username: res1.value.data.user_detail.username,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000),
          userId: res1.value.data.user,
          email: res1.value.data.user_detail.email,
          btc_wallet: res1.value.data.user_detail.btc_wallet,
          balance: res1.value.data.user_detail.balance,
          compounding: res1.value.data.user_detail.compounding,
          withdrawn: res1.value.data.user_detail.withdrawn,
          hash: res1.value.data.user_detail.hash,
          last_login: res1.value.data.user_detail.last_login,
          activeP: res1.value.data.user_detail.activeP,
          activeA: res1.value.data.user_detail.activeA,
          refLink: res1.value.data.user_detail.Link,
          first_name: res1.value.data.user_detail.first_name,
          last_name: res1.value.data.user_detail.last_name,
          country: res1.value.data.user_detail.country,
          address: res1.value.data.user_detail.address,
          zip_code: res1.value.data.user_detail.zip_code,
          city: res1.value.data.user_detail.city,
        }
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600));

        for (const x of res2.value.data.values) {
          var p = x.y
          pData.push(parseInt(p))
          var d = new Date(x.x * 1000)
          var c = moment(d).format('MMM Do ')
          pMonths.push(c)

        }
        localStorage.setItem("pMonths", JSON.stringify(pMonths));
        localStorage.setItem("PData", JSON.stringify(pData));
      })).catch(error => { console.log(error) })
    return user

  }
}

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
