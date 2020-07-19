import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  username: null,
  error: null,
  loading: false,
  userId: null,
  balance: null,
  hash: null,
  btc_wallet: null,
  detail: null,
  email: null,
  lastLogin: null,
  activeA: null,
  activeP: null,
  refLink: null

};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.user.token,
    error: null,
    loading: false,
    username: action.user.username,
    userId: action.user.userId,
    btc_wallet: action.user.btc_wallet,
    balance: action.user.balance,
    hash: action.user.hash,
    detail: action.user.detail,
    email: action.user.email,
    lastLogin: action.user.last_login,
    activeA: action.user.activeA,
    activeP: action.user.activeP,
    refLink: action.user.refLink
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    detail: action.detail
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
