import React, { useEffect, useState } from "react";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ProjectBox from "../../components/ProjectBox/ProjectBox";
import ProjectTable from "../../components/ProjectTable/ProjectTable";
import { getProjects } from "../../api/api";
import "./AllProjects.scss";

const AllProjects = () => {
  const [view, setView] = useState("grid");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await getProjects();
      if (res) setProjects(res.data);
    };
    getData();
  }, []);
  return (
    <>
      <div className="projects-info">
        <ToggleButtonGroup value={view} exclusive>
          <ToggleButton
            onClick={() => setView("grid")}
            value="grid"
            aria-label="grid"
          >
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton
            onClick={() => setView("list")}
            value="list"
            aria-label="list"
          >
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <div className="projects-title">הפרויקטים</div>
      </div>
      {view === "grid" && (
        <div className="projects-display">
          {projects.map((project) => (
            <ProjectBox project={project} />
          ))}
        </div>
      )}
      {view === "list" && (
        <div className="list-display-container">
          <ProjectTable
            projects={projects.sort((a, b) => b.status.localeCompare(a.status))}
            linkType="display"
          />
        </div>
      )}
    </>
  );
};

export default AllProjects;
