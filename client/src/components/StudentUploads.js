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

export class StudentUploads extends Component {
  state = {
    user: [],
  };
  componentDidMount() {
    console.log(this.props.match.params.id);
    axios.get(`/users/${this.props.match.params.id}`).then((res) => {
      console.log(res.data);
      this.setState({ user: res.data }, () => {
        console.log(this.state);
      });
    });
  }

  render() {
    console.log(this.state.user.student);
    if (this.state.user.student === undefined) return <p>loading</p>;
    return (
      <div className="main-uploads">
        <h1 className="main-uploads__title">
          {this.state.user.student.username}'s uploads
        </h1>
        <ul className="main-student__list">
          {this.state.user.student.uploads.map((upload) => {
            const image = `/uploads/student/${upload}`;
            const link = `/download/${upload}`;
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
                <PDF key={upload} className="main-student__image" url={image} />
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
    );
  }
}

export default StudentUploads;
