import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  var currentUser = null;
  if (
    localStorage.getItem("token") !== undefined &&
    localStorage.getItem("expiry") > Math.floor(Date.now() / 1000)
  ) {
    currentUser = localStorage.getItem("token");
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component currentUser={currentUser} {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
