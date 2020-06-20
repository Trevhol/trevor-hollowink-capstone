import React, { Component } from "react";
import axios from "axios";

export class Student extends Component {
  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.profile_pic.value);
  };
  render() {
    return (
      <>
        <div className="main-student">
          <h1 className="main-student__title">Your Assignments</h1>
          {/* <button type="submit" className="main-student__upload">
            Upload work
          </button> */}
          <form
            onSubmit={this.handleFormSubmit}
            method="post"
            encType="multipart/form-data"
          >
            <div>
              <label htmlFor="profile_pic">Upload your assignment</label>
              <input
                type="file"
                id="profile_pic"
                name="profile_pic"
                accept=".jpg, .jpeg, .png, .pdf, .doc"
              ></input>
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Student;
