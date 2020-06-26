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
      <div className="my-classroom">
        <ul>
          <h1 className="my-classroom__title">ALL STUDENTS</h1>

          {this.state.users.users.map((user) => {
            // const { users } = name;
            return (
              <div>
                <h3 className="my-classroom__username">{user.username}</h3>
                <Link to={`/student/${user.userId}`}>
                  <button className="my-classroom__button">
                    Check Submissions
                  </button>
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default MyClass;
