import React from "react";
import "./ProjectDisplay.scss";
import logoThree from "./dd.png";

const project = {
  img: logoThree,
  name: "Lets Do Something",
  id: 4911234,
  students: [
    { name: "בן טייייגגגגגל" },
    { name: "חגיחיג ןגגג" },
    { name: "עידן גחגח" },
    { name: "שירה אוסטאראא" },
  ],
  teacher: "ד״ר אמיר קירש",
  course: "פתרונות תוכנה מתקדמים",
  github: "www.github.com/danii1415",
  preview: `אני רושם מלא שורות אני רושם מלא שורות אני רושם מלא שורות ה אני רושם מלא שורות אני רושם מלא שורות אני רושם מלא שורות <br></br> <br></br> אני רושם מלא שורות אני רושם מלא שורות אני רושם מלא שורות אני רושם מלא שורות אני רושם מלא שורות אני רושם מלא שורות אני רושם מלא שורות אני רושם מלא שורות`,
};

const getStudentsNamesFormat = (students) => {
  let res = "";
  for (let i = 0; i < students.length; i++) {
    res +=
      students.length - i !== 1 ? `${students[i].name}, ` : students[i].name;
  }
  return res;
};

const ProjectDisplay = () => {
  return (
    <div className="project-display-container">
      <div className="body">
        <div className="title-img-div">
          <img className="project-img" src={logoThree} />
          <div className="project-name">{project.name}</div>
        </div>
        <div className="info-div">
          <div className="content">{project.id}</div>
          <div className="title">:מספר פרויקט</div>
        </div>
        <div className="info-div">
          <div className="content">
            {getStudentsNamesFormat(project.students)}
          </div>
          <div className="title">:שמות הסטודנטים המציגים</div>
        </div>
        <div className="info-div">
          <div className="content">{project.teacher}</div>
          <div className="title">:שם המנחה</div>
        </div>
        <div className="info-div">
          <div className="content">{project.course}</div>
          <div className="title">:שם הסדנה</div>
        </div>
        <div className="info-div">
          <a href={"www.github.com"} className="content">
            {project.github}
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

export default ProjectDisplay;
