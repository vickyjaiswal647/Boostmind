import React from "react";

import "./semesterCard.css";

const Card = (props) => (
  <div className="card-container">
    <img alt="semester" src="https://pageflutter.com/wp-content/uploads/2018/08/PAGE-FLUTTER-FEATURED-IMAGE.png"/>
    <h3 className="semester-heading">Semester  {props.semesterid}</h3>
  </div>
);

export default Card;
