// should be Sorted by course name, filtered by project name or project course

import React, { useEffect, useState } from "react";
import Chip from "@material-ui/core/Chip";
import {
  FavoriteOutlined,
  SdStorageOutlined,
  VisibilityOutlined,
} from "@material-ui/icons";
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
import ProjectTable from "../../components/ProjectTable/ProjectTable";

const AllProjects = () => {
  const [view, setView] = useState("grid");
  const history = useHistory();

  const handleViewChange = (e, nextView) => {
    console.log(nextView);
    setView(nextView);
  };
  const projects = [
    {
      projectName: "Face Recognition System",
      teacherName: "ד״ר אמיר קירש",
      course: "יישומי רשת",
      projectImg: logoThree,
      id: 3424324,
      status: "pendingTeacherApproval",
    },
    {
      projectName: "פרויקט הנדסת תוכנה",
      teacherName: "ד״ר גיא רונן",
      course: "הנדסת תוכנה",
      projectImg: logo,
      id: 4564564,
      status: "pendingStudentsEdit",
    },
    {
      projectName: "Our Amazing Project!",
      teacherName: "ד״ר אילן קירש",
      course: "HomeCommunications",
      projectImg: logoFour,
      id: 3458677,
      status: "pendingTeacherApproval",
    },
    {
      projectName: "Face Recognition System",
      teacherName: "ד״ר אמיר קירש",
      course: "יישומי רשת",
      projectImg: logoThree,
      id: 3424324,
      status: "pendingTeacherApproval",
    },
    {
      projectName: "פרויקט הנדסת תוכנה",
      teacherName: " ד״ר גיא רונן",
      course: "הנדסת תוכנה",
      projectImg: logo,
      id: 4564564,
      status: "pendingStudentsEdit",
    },
    {
      projectName: "Our Amazing Project!",
      teacherName: " ד״ר אילן קירש ",
      course: "HomeCommunications",
      projectImg: logoFour,
      id: 3458677,
      status: "pendingTeacherApproval",
    },
    {
      projectName: "Face Recognition System",
      teacherName: "ד״ר אמיר קירש",
      course: "יישומי רשת",
      projectImg: logoThree,
      id: 3424324,
      status: "pendingTeacherApproval",
    },
    {
      projectName: "פרויקט הנדסת תוכנה",
      teacherName: "ד״ר גיא רונן",
      course: "הנדסת תוכנה",
      projectImg: logo,
      id: 4564564,
      status: "pendingStudentsEdit",
    },
    {
      projectName: "Our Amazing Project!",
      teacherName: "ד״ר אילן קירש",
      course: "HomeCommunications",
      projectImg: logoFour,
      id: 3458677,
      status: "pendingTeacherApproval",
    },
  ];
  return (
    <>
      <div className="projects-info">
        <ToggleButtonGroup value={view} exclusive onChange={handleViewChange}>
          <ToggleButton value="grid" aria-label="grid">
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list">
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <div className="projects-title">הפרויקטים</div>
      </div>
      {view === "grid" && (
        <div className="projects-display">
          {projects.map((project) => (
            <ProjectBox project={project} linkType="display" />
          ))}
        </div>
      )}
      {view === "list" && (
        <div className="list-display-container">
          <ProjectTable
            projects={projects.sort((a, b) => b.status.localeCompare(a.status))}
            linkType="display"
          />
          <button className="show-more-button">הצג עוד</button>
        </div>
      )}
    </>
  );
};

export default AllProjects;
