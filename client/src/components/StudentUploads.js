import React, { Component } from "react";
import axios from "axios";
export class StudentUploads extends Component {
  state = {
    users: [],
  };
  componentDidMount() {
    console.log(this.props.match.params.id);
    axios
      .get(`http://localhost:5000/users/${this.props.match.params.id}`)
      .then((res) => {
        console.log(res.data);
        this.setState({ users: res.data }, () => {
          // console.log(this.state.locationData);
        });
      });
  }

  render() {
    console.log(this.state.users.student);
    return (
      <div>
        <h1>uploads</h1>
      </div>
    );
  }
}

export default StudentUploads;
