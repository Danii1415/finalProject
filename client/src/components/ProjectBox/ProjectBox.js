import { Chip } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./ProjectBox.scss";

const ProjectBox = ({ project }) => {
  return (
    <div className="project-container">
      <div className="project-image">
        <div className="figure">
          <img
            className="image"
            src={
              project.imageIsOld
                ? project.imgLink
                : `http://localhost:5000/get_image/${project._id}/`
            }
            alt=""
          />
        </div>
        <Link
          className="project-link"
          to={`/displayproject/${project._id}`}
        ></Link>
      </div>
      <div className="details-container">
        <div className="project-details">
          <Chip
            className="course-name"
            style={{ color: "#05a2b7", border: "1px solid #05a2b7" }}
            label={project.course_name}
            size="small"
            color="primary"
            variant="outlined"
          />
          <div>{project.title}</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBox;
