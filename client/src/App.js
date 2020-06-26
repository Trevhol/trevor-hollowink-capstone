import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Student from "./pages/Student";
import Classroom from "./pages/Home";
import Users from "./pages/MyClass";
import StudentId from "./components/StudentUploads";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn !== true ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    ></Route>
  );
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: null,
    };
  }

  componentDidMount() {
    try {
      const { username, password } = JSON.parse(localStorage.getItem("user"));
      console.log("username", username);
      if (username && password) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ isLoggedIn: false });
      }
    } catch (e) {
      console.error(
        "error when trying to get login details from localstorage",
        e
      );
      this.setState({ isLoggedIn: false });
      // noop
    }
  }

  loggedIn = (isLoggedIn) => {
    console.log(this.state.isLoggedIn, isLoggedIn);
    this.setState({ isLoggedIn });
  };

  render() {
    const LoginComponent = () => <Login loggedIn={this.loggedIn} />;
    const RegisterComponent = () => <Register loggedIn={this.loggedIn} />;
    console.log(this.state.isLoggedIn);
    return (
      <Router>
        <Header isLoggedIn={this.state.isLoggedIn} loggedIn={this.loggedIn} />
        <Switch>
          <ProtectedRoute
            isLoggedIn={this.state.isLoggedIn}
            path="/"
            component={Student}
            exact
          />
          <ProtectedRoute
            isLoggedIn={this.state.isLoggedIn}
            path="/classroom"
            component={Classroom}
            exact
          />
          <ProtectedRoute
            isLoggedIn={this.state.isLoggedIn}
            path="/users"
            component={Users}
            exact
          />
          <Route path="/student/:id" component={StudentId} exact />
          <Route path="/login" component={LoginComponent} exact />
          <Route path="/register" component={RegisterComponent} exact />
        </Switch>
      </Router>
    );
  }
}

export default App;
