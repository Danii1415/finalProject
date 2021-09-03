//fix ui, make sure photos are same height

//maybe add search/filter by projectname/id/name

import React from "react";
import "./PendingProjects.scss";
import logo from "./images/academLogo.jpeg";
import logoThree from "./images/dd.png";
import logoFour from "./images/download.png";
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
    //this should be with id
    history.push("/editpreview");
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
