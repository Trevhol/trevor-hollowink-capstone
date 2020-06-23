import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export class MyClass extends Component {
  state = {
    users: [],
  };
  componentDidMount() {
    axios.get("http://localhost:5000/users").then((res) => {
      console.log(res.data);
      this.setState({
        users: res.data,
      });
    });
  }
  render() {
    console.log(this.state.users);
    if (this.state.users.length === 0) {
      return <p>loading</p>;
    }

    return (
      <ul>
        <h1>ALL USERS</h1>
        {this.state.users.users.map((user) => {
          // const { users } = name;
          return (
            <div>
              <h3>{user.username}</h3>
              <Link to={`/student/${user.userId}`} exact>
                <button className="main-class__button">
                  Check Students Uploads
                </button>
              </Link>
            </div>
          );
        })}
      </ul>
    );
  }
}
export default MyClass;
