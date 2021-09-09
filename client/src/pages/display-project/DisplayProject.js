import React, { useEffect, useState } from "react";
import "./DisplayProject.scss";
import { getStudentsNamesFormat } from "../../utils";
import logoThree from "../../images/dd.png";
import { useParams } from "react-router";
import Axios from "axios";

const DisplayProject = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState({
    title: "",
    _id: "",
    students: [],
    teacherName: "",
    courseName: "",
    preview: "",
    githubLink: "",
  });

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await Axios.get(
          `http://localhost:5000/projects/${projectId}/`
        );
        if (res && res.data) {
          const { title, preview, studentList, _id, githubLink } = res.data;
          setProject({
            ...project,
            title: title,
            preview: preview,
            _id: _id,
            students: studentList,
            githubLink: githubLink,
            teacherName: res.data.teacher.name,
            courseName: res.data.workshop.name,
          });
        }
      } catch {}
    };
    getProject();
  }, [projectId]);

  return (
    <div className="project-display-container">
      <div className="body">
        <div className="title-img-div">
          <img className="project-img" src={logoThree} />
          <div className="project-name">{project.title}</div>
        </div>

        <div className="info-div">
          <div className="content">{project._id}</div>
          <div className="title">:מספר פרויקט</div>
        </div>
        <div className="info-div">
          <div className="content">
            {getStudentsNamesFormat(project.students)}
          </div>
          <div className="title">:שמות הסטודנטים המציגים</div>
        </div>
        <div className="info-div">
          <div className="content">{project.teacherName}</div>
          <div className="title">:שם המנחה</div>
        </div>
        <div className="info-div">
          <div className="content">{project.courseName}</div>
          <div className="title">:שם הסדנה</div>
        </div>
        <div className="info-div">
          <a href={"www.github.com"} className="content">
            {project.githubLink}
          </a>
          <div className="title">:github</div>
        </div>
        <div className="preview-container">
          <div className="preview-header">:תקציר הפרויקט</div>
          <div className="preview-content">{project.preview}</div>
        </div>
      </div>
    </div>
  );
};

export default DisplayProject;
