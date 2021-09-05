import React, { useState } from "react";
import "./TeacherProjects.scss";
import logo from "../../images/academLogo.jpeg";
import logoThree from "../../images/dd.png";
import logoFour from "../../images/download.png";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ViewQuiltIcon from "@material-ui/icons/ViewQuilt";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ProjectBox from "../../components/ProjectBox/ProjectBox";

// const projects = [
//   {
//     name: "my first one",
//     workshop: "יישומי רשת",
//     photo: logo,
//   },
//   { name: "הפרויקט השני שלנו", workshop: "יישומי רשת", photo: logoThree },
//   { name: "זה פרויקט שונה", workshop: "הנדסת תוכנה", photo: logoFour },
//   { name: "תראה מה זה", workshop: "יישומי רשת", photo: logo },
//   { name: "הנה אני פקוייקט 5", workshop: "הנדסת תוכנה", photo: logoThree },
// ];
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
const TeacherProjects = () => {
  const history = useHistory();
  const loggedInTeacher = useSelector(
    (state) => state.security.loggedInTeacher
  );
  const [view, setView] = useState("grid");

  const onProjectClick = (procectId) => {
    //this should be with id
    // history.push("/editpreview");
  };
  const handleChange = () => {};
  const onClickRoute = (project) => {
    return `/editproject`;
  };

  return (
    <>
      {loggedInTeacher ? (
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
            <div className="projects-title">הגשות שלא אושרו</div>
          </div>
          <ol className="projects-display">
            {projects.map((project) => (
              <ProjectBox onClickRoute={onClickRoute} project={project} />
            ))}
          </ol>
        </>
      ) : (
        <div>אין לך גישה לעמוד זה</div>
      )}
    </>
  );
};

export default TeacherProjects;
