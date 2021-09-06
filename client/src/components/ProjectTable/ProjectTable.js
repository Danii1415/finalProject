import { Divider } from "@material-ui/core";
import React from "react";
import TableRow from "../TableRow/TableRow";
import "./ProjectTable.scss";

const ProjectTable = ({ projects, linkType, isApproved }) => {
  const lastColoumnֿFormat = linkType === "edit" ? "סטטוס הפרויקט" : "שם המרצה";
  return (
    <div className="teacher-list">
      <div className="header-row">
        <div className="project-name-header">שם הפרויקט</div>
        <div className="course-header">שם הסדנה</div>
        <div className="project-id-header">מספר הפרויקט</div>
        <div className="status-header">{lastColoumnֿFormat}</div>
      </div>
      {projects.map((project) => {
        return (
          <>
            <TableRow
              project={project}
              isApproved={isApproved}
              linkType={linkType}
            />
            <Divider />
          </>
        );
      })}
    </div>
  );
};

export default ProjectTable;
