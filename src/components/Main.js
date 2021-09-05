import React, { useState } from "react";
import "../css/App.css";
import Login from "./User/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./Global/PrivateRoute";
import Movies from "./Movies/Movies";
import MoviesDemo from "./Movies/Demo/MoviesDemo";
import { UserContext } from "./User/UserContext";
import NotFound from "./Global/NotFound";

function Main() {
  const [user, setUser] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Movies} />
          <Route exact path="/demo" component={MoviesDemo} />
          <Route exact path="/login" component={Login} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}
export default Main;
