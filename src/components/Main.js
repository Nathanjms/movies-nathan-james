import React from "react";
import "../css/App.css";
import Login from "./User/Login";
// import Signup from "./Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "./Global/PrivateRoute";
import Movies from "./Movies/Movies";
import MoviesDemo from "./Movies/Demo/MoviesDemo";

function Main() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Movies} />
          <Route exact path="/demo" component={MoviesDemo} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="*" component={Movies} redirectTo="/" />
        </Switch>
      </AuthProvider>
    </Router>
  );
}
export default Main;
