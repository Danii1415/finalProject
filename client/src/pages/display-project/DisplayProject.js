import React, { useEffect, useState } from "react";
import { getStudentsNamesFormat } from "../../utils";
import { useParams } from "react-router";
import Axios from "axios";
import "./DisplayProject.scss";

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
          const {
            title,
            preview,
            studentList,
            number,
            githubLink,
            imageIsOld,
            imgLink,
          } = res.data;
          setProject({
            ...project,
            title: title,
            preview: preview,
            number: number,
            students: studentList,
            githubLink: githubLink,
            teacherName: res.data.teacher.name,
            courseName: res.data.course.name,
            imgLink: imgLink,
            imageIsOld: imageIsOld,
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
          <img
            alt=""
            className="project-img"
            src={
              project.imageIsOld
                ? project.imgLink
                : `http://localhost:5000/get_image/${projectId}/`
            }
          />
          <div className="project-name">{project.title}</div>
        </div>

        <div className="info-div">
          <div className="content">{project.number}</div>
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
        {project.githubLink && (
          <div className="info-div">
            <button
              onClick={() => (window.location.href = `${project.githubLink}`)}
              className="content github-link"
            >
              {project.githubLink}
            </button>
            <div className="title">:github</div>
          </div>
        )}
        <div className="preview-container">
          <div className="preview-header">:תקציר הפרויקט</div>
          <p className="preview-content">{project.preview}</p>
        </div>
      </div>
    </div>
  );
};

export default DisplayProject;
