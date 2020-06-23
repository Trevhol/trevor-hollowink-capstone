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
      .get("http://localhost:5000/teacher-uploads/", {
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
      .post("http://localhost:5000/teacher-upload", data)
      .then(this.getUploads)
      .catch(console.error);
  };

  render() {
    return (
      <div className="main-classroom">
        <form
          onSubmit={this.handleFormSubmit}
          method="post"
          encType="multipart/form-data"
        >
          <div>
            <label htmlFor="profile_pic">Upload your assignment</label>
            <input
              type="file"
              onChange={this.onFileChange}
              id="profile_pic"
              name="profile_pic"
              accept=".jpg, .jpeg, .png, .pdf, .doc"
            ></input>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
          <div>
            {this.state.uploads.map((upload) => {
              const image = `http://localhost:5000/uploads/teacher/${upload}`;
              const link = `http://localhost:5000/assignment-download/${upload}`;
              if (isImage(upload)) {
                return (
                  <div key={upload}>
                    <a href={link}>
                      <p>Get your assignment here</p>
                      <img src={image} />
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
    );
  }
}

export default Home;
