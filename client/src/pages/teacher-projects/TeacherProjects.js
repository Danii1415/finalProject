import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProjectTable from "../../components/ProjectTable/ProjectTable";
import { Checkbox, withStyles } from "@material-ui/core";
import { useParams } from "react-router";
import Axios from "axios";
import "./TeacherProjects.scss";
import { BASE_ROUTE } from "../../const";

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
          `${BASE_ROUTE}/projects/teacher/${teacherId}`
        );
        if (res && res.data) {
          const coursesSet = new Set();
          for (const project of res.data) {
            coursesSet.add(project.course_name);
          }
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
          b.course_name.localeCompare(a.course_name)
      );
    }
    if (approvedArr.length) {
      approvedArr = approvedArr.sort((a, b) =>
        b.course_name.localeCompare(a.course_name)
      );
    }
    setPendingProjects(pendingArr);
    setApprovedProjects(approvedArr);
  }, [filteredProjects]);

  useEffect(() => {
    if (teacherProjects.length) {
      setFilteredProjects(
        teacherProjects.filter((project) => {
          return currDisplayedCourses.indexOf(project.course_name) > -1;
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
              <div className="title">?????????? ?????? ??????????</div>
              {coursesCheckboxes.length > 1 &&
                coursesCheckboxes.map((course, idx) => {
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
                ?????? ?????????? ???????????????? ????????????
              </div>
            )}
          </div>
          <div className="list-display-container">
            <div className="title-container">
              <div className="approved-title">?????????? ????????????</div>
            </div>
            {approvedProjects.length ? (
              <ProjectTable
                isApproved={true}
                projects={approvedProjects}
                linkType="edit"
              />
            ) : (
              <div className="no-projects-message">?????? ?????????? ????????????</div>
            )}
          </div>
        </>
      ) : (
        <div className="not-authorized">
          <div className="header">?????? ???? ???????? ?????????? ????</div>
          <div className="description">?????????? ???????? ???????? ???? ?????? ?????????? ??????????</div>
        </div>
      )}
    </>
  );
};

export default TeacherProjects;
