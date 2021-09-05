import React from "react";
import "./TableRow.scss";

const TableRow = ({ project }) => {
  return (
    <div className="content-row">
      <div className="img-wrapper">
        <img src={project.projectImg} className="img-name-content" />
      </div>
      <div className="project-name">
        <span>{project.projectName}</span>
      </div>
      <div className="course-content">
        <span>{project.course}</span>
      </div>
      <div className="project-id-content">
        <span>{project.id}</span>
      </div>
      <div className="status-content">
        <span>{project.status}</span>
      </div>
    </div>
  );
};

export default TableRow;
