import React, { Component } from "react";
import * as docx from "docx";
import axios from "axios";
console.log(docx);

const isImage = (fileName) => {
  const extension = fileName.split(".")[1];
  const isImage =
    extension.includes("jpeg") ||
    extension.includes("jpg") ||
    extension.includes("png");

  return isImage;
};

export class Home extends Component {
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
    axios
      .get("/teacher-uploads/", {
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

    axios
      .post("/teacher-upload", data)
      .then(this.getUploads)
      .catch(console.error);
  };

  render() {
    return (
      <div className="main-classroom">
        <h1 className="main-classroom__title">Your Homework</h1>
        <div className="main-classroom__wrapper">
          <form
            onSubmit={this.handleFormSubmit}
            method="post"
            encType="multipart/form-data"
            className="main-student__form"
          >
            <div>
              <label className="main-classroom__label" htmlFor="profile_pic">
                Upload Assignments
              </label>
              <input
                type="file"
                onChange={this.onFileChange}
                id="profile_pic"
                name="profile_pic"
                accept=".jpg, .jpeg, .png, .pdf, .doc"
              ></input>
            </div>
            <div>
              <button className="main-classroom__submit" type="submit">
                Submit
              </button>
            </div>
            <div className="main-student__list">
              {this.state.uploads.map((upload) => {
                const image = `/uploads/teacher/${upload}`;
                const link = `/assignment-download/${upload}`;
                if (isImage(upload)) {
                  return (
                    <div key={upload}>
                      <a href={link}>
                        <p className="main-classroom__download">
                          DOWNLOAD ASSIGNMENT
                        </p>
                        <img className="main-student__image" src={image} />
                      </a>
                    </div>
                  );
                }

                return (
                  <div key={upload}>
                    <a download href={link}>
                      <p>
                        Get your assignment here
                        <br />
                        {upload}
                      </p>
                    </a>
                  </div>
                );
              })}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Home;
