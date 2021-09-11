import React, { useEffect, useState } from "react";
import "./TeacherProjects.scss";
import { useSelector } from "react-redux";
import "./TeacherProjects.scss";
import ProjectTable from "../../components/ProjectTable/ProjectTable";
import { Checkbox, withStyles } from "@material-ui/core";
import { useParams } from "react-router";
import Axios from "axios";

const GreenCheckbox = withStyles({
  root: {
    color: "#028cb7",
    "&$checked": {
      color: "#028cb7",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const TeacherProjects = () => {
  const { teacherId } = useParams();
  const [teacherProjects, setTeacherProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [approvedProjects, setApprovedProjects] = useState([]);
  const [pendingProjects, setPendingProjects] = useState([]);
  const [coursesCheckboxes, setCoursesCheckboxes] = useState([]);
  const [currDisplayedCourses, setCurrDisplayedCourses] = useState([]);

  useEffect(() => {
    const getTeacherProjects = async () => {
      try {
        const res = await Axios.get(
          `http://localhost:5000/projects/teacher/${teacherId}`
        );
        if (res && res.data) {
          const coursesSet = new Set();
          for (const project of res.data) {
            coursesSet.add(project.workshop.name);
          }
          console.log(res.data);
          setCoursesCheckboxes(
            [...coursesSet].map((courseName) => {
              return { name: courseName, checked: true };
            })
          );
          setCurrDisplayedCourses([...coursesSet]);
          setTeacherProjects(res.data);
          setFilteredProjects(res.data);
        }
      } catch (e) {}
    };
    getTeacherProjects();
  }, [teacherId]);

  useEffect(() => {
    let approvedArr = [],
      pendingArr = [];
    if (filteredProjects.length) {
      approvedArr = filteredProjects.filter(
        (project) => project.status === "approved"
      );
      pendingArr = filteredProjects.filter(
        (project) => project.status !== "approved"
      );
    }
    if (pendingArr.length) {
      pendingArr = pendingArr.sort(
        (a, b) =>
          b.status.localeCompare(a.status) ||
          b.workshop.name.localeCompare(a.workshop.name)
      );
    }
    if (approvedArr.length) {
      approvedArr = approvedArr.sort((a, b) =>
        b.workshop.name.localeCompare(a.workshop.name)
      );
    }
    setPendingProjects(pendingArr);
    setApprovedProjects(approvedArr);
  }, [filteredProjects]);

  useEffect(() => {
    if (teacherProjects.length) {
      setFilteredProjects(
        teacherProjects.filter((project) => {
          return currDisplayedCourses.indexOf(project.workshop.name) > -1;
        })
      );
    }
  }, [currDisplayedCourses]);

  const loggedInTeacher = useSelector(
    (state) => state.security.loggedInTeacher
  );

  const handleCheckboxChange = (e, idx) => {
    const changedCheckbox = coursesCheckboxes.find(
      (course) => course.name === e.target.name
    );
    const _coursesCheckboxes = [
      ...coursesCheckboxes.slice(0, idx),
      { ...changedCheckbox, checked: !changedCheckbox.checked },
      ...coursesCheckboxes.slice(idx + 1),
    ];
    setCoursesCheckboxes(_coursesCheckboxes);
    setCurrDisplayedCourses(
      _coursesCheckboxes
        .filter((checkbox) => checkbox.checked === true)
        .map((course) => course.name)
    );
  };

  return (
    <>
      {loggedInTeacher ? (
        <>
          <div className="list-display-container">
            <div className="title-container">
              <div className="title">הגשות שלא אושרו</div>
              {coursesCheckboxes.map((course, idx) => {
                return (
                  <>
                    <span className="checkbox-text">{course.name}</span>
                    <GreenCheckbox
                      checked={course.checked}
                      onChange={(e) => handleCheckboxChange(e, idx)}
                      name={course.name}
                    />
                  </>
                );
              })}
            </div>
            {pendingProjects.length ? (
              <ProjectTable projects={pendingProjects} linkType="edit" />
            ) : (
              <div className="no-projects-message">
                אין הגשות שממתינות לאישור
              </div>
            )}
            {/* <button className="show-more-button">הצג עוד</button> */}
          </div>
          <div className="list-display-container">
            <div className="title-container">
              <div className="approved-title">הגשות שאושרו</div>
            </div>
            {approvedProjects.length ? (
              <ProjectTable
                isApproved={true}
                projects={approvedProjects}
                linkType="edit"
              />
            ) : (
              <div className="no-projects-message">אין הגשות שאושרו</div>
            )}
            {/* <button className="show-more-button">הצג עוד</button> */}
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
