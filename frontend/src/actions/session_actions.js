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

export const logoutUser = () => {
  return {
    type: RECEIVE_USER_LOGOUT,
  };
};

export const logout = () => (dispatch) => {
  //Remove the token from local storage
  localStorage.removeItem("jwtToken");
  //Remove the token from the common axios header
  APIUtil.setAuthToken(false);
  //dispatch logout action
  dispatch(logoutUser());
};
