import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  var userToken = null;
  if (
    localStorage.getItem("token") !== undefined &&
    localStorage.getItem("expiry") > Math.floor(Date.now() / 1000) &&
    !userToken
  ) {
    userToken = localStorage.getItem("token");
    console.log(`user Token: ${userToken}`);
  }
  console.log(`user Token: ${userToken}`);

  return (
    <Route
      {...rest}
      render={(props) => {
        return userToken ? <Component userToken={userToken} {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
}
