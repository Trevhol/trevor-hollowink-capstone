import React from "react";
import pdf from "../assets/pdf.png";

const PDF = ({ url }) => {
  return (
    <div>
      <a href={url}>
        <img
          className="main-student__image"
          src={pdf}
          alt="students homework"
        />
      </a>
    </div>
  );
};

export default PDF;
