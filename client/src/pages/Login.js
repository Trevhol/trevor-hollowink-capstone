import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  componentDidMount() {
    try {
      const { username, password } = JSON.parse(localStorage.getItem("user"));

      if (username && password) {
        this.setState({ username, password });
      }
    } catch (e) {
      // noop
    }
  }

  onUsernameChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  onPasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  onLoginClick = (event) => {
    const { username, password } = this.state;
    const user = JSON.stringify({ username, password });
    if (username && password) {
      axios
        .post("http://localhost:5000/login", {
          headers: {
            "Content-Type": "application/json",
          },
          body: user,
        })
        .then((res) => {
          localStorage.setItem("user", user);
          this.props.loggedIn(true);
          this.props.history.push("/");
        })
        .catch(() => alert("Please enter valid credentials"));
    }
  };

  render() {
    return (
      <div className="main-login">
        <div className="main-login__wrapper">
          <h1 className="main-login__title">LOGIN</h1>
          <input
            className="main-login__username"
            name="username"
            type="text"
            onChange={this.onUsernameChange}
            value={this.state.username}
            placeholder="Enter your username"
          ></input>
          <input
            className="main-login__password"
            name="password"
            type="password"
            onChange={this.onPasswordChange}
            value={this.state.password}
            placeholder="Enter your password"
          ></input>
          <button className="main-login__button" onClick={this.onLoginClick}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
