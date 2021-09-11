import React from "react";
import { useHistory } from "react-router";
import "./TableRow.scss";

const TableRow = ({ project, linkType }) => {
  const history = useHistory();
  const onFieldClick = () => {
    linkType === "display" || project.status === "approved"
      ? history.push(`/DisplayProject/${project._id}`)
      : history.push(`/editproject/${project._id}`);
  };
  const statusFormat =
    project.status === "pendingTeacherApproval"
      ? "ממתין לאישור מרצה"
      : project.status === "pendingStudentsEdit"
      ? "ממתין לעריכת סטודנטים"
      : "אושר לדף הסדנאות";
  return (
    <div className="content-row">
      <div className="img-wrapper">
        <img
          src={
            project.imageIsOld
              ? project.imgLink
              : `http://localhost:5000/get_image/${project._id}/`
          }
          className="img-name-content"
        />
      </div>
      <div className="project-name">
        <span className="hover-white" onClick={onFieldClick}>
          {project.title}
        </span>
      </div>
      <div className="course-content">
        <span className="hover-white" onClick={onFieldClick}>
          {project.workshop_name}
        </span>
      </div>
      <div className="project-id-content">
        <span className="hover-white" onClick={onFieldClick}>
          {project.number}
        </span>
      </div>
      {linkType === "edit" && (
        <div className="last-content">
          <span
            className={
              project.status === "pendingTeacherApproval"
                ? "orange"
                : project.status === "pendingStudentsEdit"
                ? "red"
                : "green"
            }
          >
            {statusFormat}
          </span>
        </div>
      )}
      {linkType === "display" && (
        <div className="last-content">
          <span className="hover-white">{project.teacher_name}</span>
        </div>
      )}
    </div>
  );
};

export default TableRow;
