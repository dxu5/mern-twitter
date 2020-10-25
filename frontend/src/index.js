import React from "react";
import ReactDOM from "react-dom";

import Root from "./components/root";

import configureStore from "./store/store";
//use to parse user's session token
import jwt_decode from "jwt-decode";

import { setAuthToken } from "./util/session_api_util";

import { logout } from "./actions/session_actions";

document.addEventListener("DOMContentLoaded", () => {
  let store;
  //If a returning user has a session token stored in localStorage
  if (localStorage.jwtToken) {
    //Set the token as a common header for all axios requests
    setAuthToken(localStorage.jwtToken);

    const decodedUser = jwt_decode(localStorage.jwtToken);

    const preloadedState = {
      session: { isAuthenticated: true, user: decodedUser },
    };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    //ifuser token has expired
    if (decodedUser.exp < currentTime) {
      //Logout user and redirect to login page
      store.dispatch(logout());
      window.location.href = "/login";
    }
  } else {
    //if this is a first time user, start with an empty store
    store = configureStore({});
  }

  const root = document.getElementById("root");

  ReactDOM.render(<Root store={store} />, root);
});
