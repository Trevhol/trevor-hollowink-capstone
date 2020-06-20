import React, { Component } from "react";

export class Login extends Component {
  render() {
    return (
      <div>
        <h1>LOGIN</h1>
        <textarea
          className="main-register__username"
          name="message"
          placeholder="Enter your username"
        ></textarea>
        <textarea
          className="main-register__password"
          name="message"
          placeholder="Enter your password"
        ></textarea>
      </div>
    );
  }
}

export default Login;
