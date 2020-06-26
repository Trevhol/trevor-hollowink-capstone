import React, { Component } from "react";
import axios from "axios";
import PDF from "../components/PDF";

const isImage = (fileName) => {
  const extension = fileName.split(".")[1];
  const isImage =
    extension.includes("jpeg") ||
    extension.includes("jpg") ||
    extension.includes("png");

  return isImage;
};

const isPdf = (fileName) => {
  const extension = fileName.split(".")[1];

  return extension === "pdf";
};

const test = {
  color: `blue`,
};

export class Student extends Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
      uploads: [],
    };
  }

  componentDidMount() {
    this.getUploads();
  }

  onFileChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  getUploads = () => {
    const { username } = JSON.parse(localStorage.getItem("user"));

    axios
      .get(`/uploads/${username}/`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        this.setState({ uploads: res.data.files });
      })
      .catch(console.error);
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", this.state.selectedFile, this.state.selectedFile.name);
    const { username } = JSON.parse(localStorage.getItem("user"));

    axios
      .post(`/upload/${username}`, data)
      .then((res) => {
        this.setState({ uploads: [res.data, ...this.state.uploads] });
      })

      .catch(console.error);
  };

  render() {
    console.log(this.state.uploads);
    return (
      <>
        <div className="main-student">
          <h1 className="main-student__title">Your Assignments</h1>
          <form
            onSubmit={this.handleFormSubmit}
            method="post"
            encType="multipart/form-data"
            className="main-student__form"
          >
            <div>
              <label className="main-student__label" htmlFor="profile_pic">
                TURN IN YOUR HOMEWORK!
              </label>
              <input
                className="main-student__button"
                style={test}
                type="file"
                onChange={this.onFileChange}
                id="profile_pic"
                accept=".jpg, .jpeg, .png, .pdf, .doc"
              ></input>
            </div>
            <div>
              <button className="main-student__submit" type="submit">
                Submit
              </button>
              <div></div>
            </div>
          </form>
          <div className="main-student__wrapper">
            <h2 className="main-student__uploads">My Homework</h2>
            <ul className="main-student__list">
              {this.state.uploads.map((upload) => {
                const image = `http://localhost:5000/public/uploads/student/${upload}`;
                const link = `http://localhost:5000/public/download/${upload}`;
                if (isImage(upload)) {
                  return (
                    <li className="main-student__content" key={upload}>
                      <a href={link}>
                        <img className="main-student__image" src={image} />
                      </a>
                    </li>
                  );
                }

                if (isPdf(upload)) {
                  console.log("pdf", upload, image);
                  return (
                    <PDF
                      key={upload}
                      className="main-student__image"
                      url={image}
                    />
                  );
                }

                return (
                  <li classname="main-student__link" key={upload}>
                    <a classname="main-student__link" download href={link}>
                      {link}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Student;
