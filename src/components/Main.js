import React, { useEffect, useState } from "react";
import "../css/App.css";
import Login from "./User/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./Global/PrivateRoute";
import Movies from "./Movies/Movies";
import MoviesDemo from "./Movies/Demo/MoviesDemo";
import { UserContext } from "./User/UserContext";

function Main() {
  const [user, setUser] = useState(false);
  return (
    <Router>
      <Switch>
        <UserContext.Provider
          value={{ user, setUser }}
        >
          <PrivateRoute exact path="/" component={Movies} />
          <Route exact path="/demo" component={MoviesDemo} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="*" component={Movies} redirectTo="/" />
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}
export default Main;
