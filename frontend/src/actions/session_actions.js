import * as APIUtil from "../util/session_api_util.js";
import jwt_decode from "jwt-decode";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";

//dispatch this when our user signs in
export const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser,
  };
};

//this will be used to redirect user to login page upon signup
export const receiveUserSignIn = () => {
  return {
    type: RECEIVE_USER_SIGN_IN,
  };
};

//we dispatch this one to show authentication errors on the frontend
export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors,
  };
};

//When our user logs out, we will dispatch this action to set isAuth to false
export const logoutUser = () => {
  return {
    type: RECEIVE_USER_LOGOUT,
  };
};

//upon signup dispatch the appropriate action depending on which type of response is received from backend
export const signup = (user) => (dispatch) => {
  return APIUtil.signup(user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      return dispatch(receiveCurrentUser(decoded));
    })
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const login = (user) => (dispatch) => {
  return APIUtil.login(user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      return dispatch(receiveCurrentUser(decoded));
    })
    .catch((err) => dispatch(receiveErrors(err.response.data)));
};

export const logout = () => (dispatch) => {
  //Remove the token from local storage
  localStorage.removeItem("jwtToken");
  //Remove the token from the common axios header
  APIUtil.setAuthToken(false);
  //dispatch logout action
  dispatch(logoutUser());
};
