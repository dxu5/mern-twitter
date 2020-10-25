import * as APIUtil from "../util/session_api_util.js";
import jwt_decode from "jwt-decode";

export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";

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
