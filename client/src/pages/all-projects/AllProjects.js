import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import { FavoriteOutlined, VisibilityOutlined } from "@material-ui/icons";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ViewQuiltIcon from "@material-ui/icons/ViewQuilt";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import logoFour from "../../images/download.png";
import "./AllProjects.scss";
import logo from "../../images/academLogo.jpeg";
import logoThree from "../../images/dd.png";

const AllProjects = () => {
  const [view, setView] = useState("grid");

  const handleChange = (event, nextView) => {
    setView(nextView);
  };
  const projects = [
    {
      projectName: "פרוייקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
    },
    {
      projectName: "פרוייקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logo,
    },
    {
      projectName: "פרוייקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoFour,
    },
    {
      projectName: "פרוייקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
    },
    {
      projectName: "פרוייקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
    },
    {
      projectName: "פרוייקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
    },
    {
      projectName: "פרוייקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
    },
    {
      projectName: "פרוייקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
    },
    {
      projectName: "פרוייקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
    },
    {
      projectName: "פרוייקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
    },
    {
      projectName: "פרוייקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
    },
    {
      projectName: "פרוייקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
    },
    {
      projectName: "פרוייקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
    },
    {
      projectName: "פרוייקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
    },
  ];
  return (
    <>
      <div className="projects-info">
        <ToggleButtonGroup
          className="display-options"
          value={view}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="grid" aria-label="grid">
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list">
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <div className="projects-title">הפרוייקטים</div>
      </div>
      <ol className="projects-display">
        {projects.map((project) => (
          <li className="project-container">
            <div className="project-image">
              <div className="figure">
                <img className="image" src={project.projectImg} />
              </div>
              <a className="project-link" href=""></a>
            </div>
            <div className="details-container">
              <div className="project-statistics">
                {/* {/<div className="statistics-icon">/} */}
                {/*    <FavoriteOutlined fontSize='small' color="disabled" />*/}
                {/*    <span>44</span>*/}
                {/* {/</div>/} */}
                <div className="statistics-icon">
                  <VisibilityOutlined fontSize="small" color="disabled" />
                  <span>89</span>
                </div>
              </div>
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
          </li>
        ))}
      </ol>
    </>
  );
};

export default AllProjects;
