import { Chip } from "@material-ui/core";
import { VisibilityOutlined } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import "./ProjectBox.scss";
const ProjectBox = ({ project, linkType }) => {
  return (
    <div className="project-container">
      <div className="project-image">
        <div className="figure">
          <img className="image" src={project.projectImg} />
        </div>
        <Link
          className="project-link"
          to={linkType === "display" ? "/displayproject" : "/editproject"}
        ></Link>
      </div>
      <div className="details-container">
        {/* <div className="project-statistics"> */}
        {/* {/<div className="statistics-icon">/} */}
        {/*    <FavoriteOutlined fontSize='small' color="disabled" />*/}
        {/*    <span>44</span>*/}
        {/* {/</div>/} */}
        {/* <div className="statistics-icon">
            <VisibilityOutlined fontSize="small" color="disabled" />
            <span>89</span>
          </div> */}
        {/* </div> */}
        <div className="project-details">
          <Chip
            className="course-name"
            style={{ color: "#05a2b7", border: "1px solid #05a2b7" }}
            label={project.course}
            size="small"
            color="primary"
            variant="outlined"
          />
          <div>{project.projectName}</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBox;
