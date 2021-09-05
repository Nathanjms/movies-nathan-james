import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  var token = null;
  if (
    localStorage.getItem("token") !== undefined &&
    localStorage.getItem("expiry") > Math.floor(Date.now() / 1000)
  ) {
    token = localStorage.getItem("token");
    console.log("setting...");
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        return token ? (
          <Component token={token} {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
