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
import "./TeacherProjects.scss";
import { Chip, Divider } from "@material-ui/core";
import ProjectTable from "../../components/ProjectTable/ProjectTable";

const projects = [
  {
    projectName: "Face Recognition System",
    course: "יישומי רשת",
    projectImg: logoThree,
    id: 3424324,
    status: "מחכה לאישור מרצה",
  },
  {
    projectName: "פרויקט הנדסת תוכנה",
    course: "הנדסת תוכנה",
    projectImg: logo,
    id: 4564564,
    status: "מחכה לעריכת הסטודנטים",
  },
  {
    projectName: "Face Recognition System",
    course: "HomeCommunications",
    projectImg: logoFour,
    id: 3458677,
    status: "מחכה לאישור מרצה",
  },
  // {
  //   projectName: "פרויקט הנדסת תוכנה",
  //   course: "הנדסת תוכנה",
  //   projectImg: logoThree,
  //   id: 1,
  // },
  // {
  //   projectName: "Face Recognition System",
  //   course: "הנדסת תוכנה",
  //   projectImg: logo,
  // },
  // {
  //   projectName: "פרויקט הנדסת תוכנה",
  //   course: "הנדסת תוכנה",
  //   projectImg: logoFour,
  // },
  // {
  //   projectName: "Face Recognition System",
  //   course: "הנדסת תוכנה",
  //   projectImg: logoThree,
  // },
  // {
  //   projectName: "פרויקט הנדסת תוכנה",
  //   course: "הנדסת תוכנה",
  //   projectImg: logo,
  // },
  // {
  //   projectName: "Face Recognition System",
  //   course: "הנדסת תוכנה",
  //   projectImg: logoFour,
  // },
  // {
  //   projectName: "Face Recognition System",
  //   course: "הנדסת תוכנה",
  //   projectImg: logoThree,
  // },
  // {
  //   projectName: "פרויקט הנדסת תוכנה",
  //   course: "הנדסת תוכנה",
  //   projectImg: logo,
  // },
  // {
  //   projectName: "Face Recognition System",
  //   course: "הנדסת תוכנה",
  //   projectImg: logoFour,
  // },
  // {
  //   projectName: "פרויקט הנדסת תוכנה",
  //   course: "הנדסת תוכנה",
  //   projectImg: logoThree,
  // },
  // {
  //   projectName: "Face Recognition System",
  //   course: "הנדסת תוכנה",
  //   projectImg: logo,
  // },
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
    <div className="list-display-container">
      <div className="title">הגשות שלא אושרו</div>
      <ProjectTable projects={projects} />
      <button className="show-more-button">הצג עוד</button>
      {/* {loggedInTeacher ? (
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
              <ProjectBox linkType="edit" project={project} />
            ))}
          </ol>
        </>
      ) : (
        <div className="not-authorized">
          <div className="header">אין לך גישה לעמוד זה</div>
          <div className="description">היכנס בתור מרצה על מנת לצפות בתוכן</div>
        </div>
      )} */}
    </div>
  );
};

export default TeacherProjects;
