import React, { Component } from "react";
import * as docx from "docx";
console.log(docx);
export class Home extends Component {
  render() {
    return (
      <div classNam="main-classroom">
        <button className="main-classroom__button">
          Get your assignment here
        </button>
      </div>
    );
  }
}

export default Home;
