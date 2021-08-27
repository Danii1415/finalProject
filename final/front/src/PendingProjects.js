import React from "react";
import "./PendingProjects.scss";
import logo from "./academLogo.jpeg";
import logoThree from "./dd.png";
import logoFour from "./download.png";
import logoFive from "./academLogo.jpeg";
import logoSix from "./academLogo.jpeg";
import { useHistory } from "react-router-dom";

const projects = [
  {
    name: "my first one",
    workshop: "יישומי רשת",
    photo: logo,
  },
  { name: "הפרוייקט השני שלנו", workshop: "יישומי רשת", photo: logoThree },
  { name: "זה פרוייקט שונה", workshop: "הנדסת תוכנה", photo: logoFour },
  { name: "תראה מה זה", workshop: "יישומי רשת", photo: logo },
  { name: "הנה אני פקוייקט 5", workshop: "הנדסת תוכנה", photo: logoThree },
];

const PendingProjects = () => {
  const history = useHistory();
  const onProjectClick = (e) => {
    history.push("");
  };
  return (
    <div className="pending-container">
      <label>הגשות שלא אושרו</label>
      <div className="projects-div">
        {projects.map((project) => {
          return (
            <div className="project">
              <img
                onClick={onProjectClick}
                className="project-img"
                src={project.photo}
              />
              <div className="project-title">{project.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PendingProjects;
