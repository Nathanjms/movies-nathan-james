import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../User/UserContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { token } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
