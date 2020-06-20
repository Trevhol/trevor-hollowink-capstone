import React, { Component } from "react";

export class Register extends Component {
  render() {
    return (
      <div>
        <h1>REGISTER</h1>
        <form className="main-register__form">
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
        </form>
      </div>
    );
  }
}

export default Register;
