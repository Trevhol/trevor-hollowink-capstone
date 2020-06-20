import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Student from "./pages/Student";
import Classroom from "./pages/Home";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path="/student" component={Student} exact />
          <Route path="/classroom" component={Classroom} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
        </Switch>
      </Router>
    );
  }
}

export default App;
