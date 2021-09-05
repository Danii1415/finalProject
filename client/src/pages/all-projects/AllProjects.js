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
import { Link, useHistory } from "react-router-dom";
import ProjectBox from "../../components/ProjectBox/ProjectBox";

const AllProjects = () => {
  const [view, setView] = useState("grid");
  const history = useHistory();

  const onClickRoute = (project) => {
    // history.push("displayproject");
  };

  const handleChange = (e, nextView) => {
    setView(nextView);
  };
  const projects = [
    {
      projectName: "פרויקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
      id: 1,
    },
    {
      projectName: "פרויקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logo,
      id: 1,
    },
    {
      projectName: "פרויקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoFour,
      id: 1,
    },
    {
      projectName: "פרויקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
      id: 1,
    },
    {
      projectName: "פרויקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
    },
    {
      projectName: "פרויקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
    },
    {
      projectName: "פרויקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
    },
    {
      projectName: "פרויקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
    },
    {
      projectName: "פרויקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
    },
    {
      projectName: "פרויקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
    },
    {
      projectName: "פרויקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
    },
    {
      projectName: "פרויקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
    },
    {
      projectName: "פרויקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
    },
    {
      projectName: "פרויקט הנדסת תוכנה",
      course: "הנדסת תוכנה",
      projectImg: logoThree,
    },
  ];
  return (
    <>
      <div className="projects-info">
        <ToggleButtonGroup value={view} exclusive onChange={handleChange}>
          <ToggleButton value="grid" aria-label="grid">
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list">
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <div className="projects-title">הפרויקטים</div>
      </div>
      <div className="projects-display">
        {projects.map((project) => (
          <ProjectBox project={project} onClickRoute={onClickRoute} />
        ))}
      </div>
    </>
  );
};

export default AllProjects;
