import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

//Passed in from parent component or from mapStateToProps

const Auth = ({ component: Component, path, loggedIn, exact }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        return !loggedIn ? <Component {...props} /> : <Redirect to="/tweets" />;
      }}
    />
  );
};

const Protected = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return loggedIn ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

//use the isAuthenticated state to determine whether a user is logged in or not

const mapStateToProps = (state) => {
  return {
    loggedIn: state.session.isAuthenticated,
  };
};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(
  connect(mapStateToProps, null)(Protected)
);
