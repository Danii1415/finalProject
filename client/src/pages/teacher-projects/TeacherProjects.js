import React, { useEffect, useState } from "react";
import "./TeacherProjects.scss";
import logo from "../../images/academLogo.jpeg";
import logoThree from "../../images/dd.png";
import logoFour from "../../images/download.png";
import { useSelector } from "react-redux";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ViewQuiltIcon from "@material-ui/icons/ViewQuilt";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ProjectBox from "../../components/ProjectBox/ProjectBox";
import "./TeacherProjects.scss";
import ProjectTable from "../../components/ProjectTable/ProjectTable";
import { Checkbox } from "@material-ui/core";
import { useParams } from "react-router";
import Axios from "axios";

const initialProjects = [
  {
    projectName: "Face Recognition System",
    course: "יישומי רשת",
    projectImg: logoThree,
    id: 3424324,
    status: "pendingTeacherApproval",
  },
  {
    projectName: "פרויקט הנדסת תוכנה",
    course: "הנדסת תוכנה",
    projectImg: logo,
    id: 4564564,
    status: "pendingStudentsEdit",
  },
  {
    projectName: "Our Amazing Project!",
    course: "HomeCommunications",
    projectImg: logoFour,
    id: 3458677,
    status: "pendingTeacherApproval",
  },
  {
    projectName: "Face Recognition System",
    course: "יישומי רשת",
    projectImg: logoThree,
    id: 3424324,
    status: "pendingTeacherApproval",
  },
  {
    projectName: "פרויקט הנדסת תוכנה",
    course: "הנדסת תוכנה",
    projectImg: logo,
    id: 4564564,
    status: "pendingStudentsEdit",
  },
  {
    projectName: "Our Amazing Project!",
    course: "HomeCommunications",
    projectImg: logoFour,
    id: 3458677,
    status: "pendingTeacherApproval",
  },
  {
    projectName: "Face Recognition System",
    course: "יישומי רשת",
    projectImg: logoThree,
    id: 3424324,
    status: "pendingTeacherApproval",
  },
  {
    projectName: "פרויקט הנדסת תוכנה",
    course: "הנדסת תוכנה",
    projectImg: logo,
    id: 4564564,
    status: "pendingStudentsEdit",
  },
  {
    projectName: "Our Amazing Project!",
    course: "HomeCommunications",
    projectImg: logoFour,
    id: 3458677,
    status: "pendingTeacherApproval",
  },
];
const initialApprovedProjects = [
  {
    projectName: "Face Recognition System",
    course: "יישומי רשת",
    projectImg: logoThree,
    id: 3424324,
    status: "approved",
  },
  {
    projectName: "פרויקט הנדסת תוכנה",
    course: "הנדסת תוכנה",
    projectImg: logo,
    id: 4564564,
    status: "approved",
  },
  {
    projectName: "Our Amazing Project!",
    course: "HomeCommunications",
    projectImg: logoFour,
    id: 3458677,
    status: "approved",
  },
  {
    projectName: "Face Recognition System",
    course: "יישומי רשת",
    projectImg: logoThree,
    id: 3424324,
    status: "approved",
  },
];
const TeacherProjects = () => {
  const { teacherId } = useParams();
  const [teacherProjects, setTeacherProjects] = useState([]);

  useEffect(() => {
    const getTeacherProjects = async () => {
      try {
        const res = await Axios.get(
          "http://localhost:5000/projects/teacher/6136303f70a7bb817e044709"
        );
        if (res && res.data) {
          setTeacherProjects(res.data);
        }
      } catch (e) {}
    };
    getTeacherProjects();
  }, [teacherId]);

  const loggedInTeacher = useSelector(
    (state) => state.security.loggedInTeacher
  );
  const [currApproved, setCurrApproved] = useState(initialApprovedProjects);
  const [currProjects, setCurrProjects] = useState(initialProjects);

  // const [courses, setCourses] = useState([
  //   { checked: true, name: "יישומי רשת" },
  //   { checked: true, name: "הנדסת תוכנה" },
  //   { checked: true, name: "HomeCommunications" },
  // ]);

  return (
    <>
      {loggedInTeacher ? (
        <>
          <div className="list-display-container">
            <div className="title-container">
              <div className="title">הגשות שלא אושרו</div>
              {/* {courses.map((course) => {
                return (
                  <>
                    <span className="checkbox-text">{course}</span>
                    <Checkbox checked={course.name} />
                  </>
                );
              })} */}
            </div>
            <ProjectTable
              projects={currProjects.sort(
                (a, b) =>
                  b.status.localeCompare(a.status) ||
                  b.course.localeCompare(a.course)
              )}
              linkType="edit"
            />
            <button className="show-more-button">הצג עוד</button>
          </div>
          <div className="list-display-container">
            <div className="title-container">
              <div className="title">הגשות שאושרו</div>
            </div>

            <ProjectTable
              isApproved={true}
              projects={currApproved.sort((a, b) =>
                b.course.localeCompare(a.course)
              )}
              linkType="edit"
            />
            <button className="show-more-button">הצג עוד</button>
          </div>
        </>
      ) : (
        <div className="not-authorized">
          <div className="header">אין לך גישה לעמוד זה</div>
          <div className="description">היכנס בתור מרצה על מנת לצפות בתוכן</div>
        </div>
      )}
    </>
  );
};

export default TeacherProjects;

{
  /* {loggedInTeacher ? (
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
      )} */
}
