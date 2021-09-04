import "./App.css";
import "@fontsource/roboto";
import AddProject from "./pages/add-project/AddProject";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import AllProjects from "./pages/all-projects/AllProjects";
import Navbar from "./components/navbar/Navbar";
import EditPreview from "./pages/edit-project/EditProject";
import SignIn from "./pages/sign-in/SignIn";
import TeacherProjects from "./pages/teacher-projects/TeacherProjects";
import DisplayProject from "./pages/display-project/DisplayProject";

import { useEffect, useState } from "react";
const App = () => {
  const [loggedInTeacher, setLoggedInTeacher] = useState("");
  const history = useHistory();

  const onSignOut = () => {
    localStorage.removeItem("loggedInTeacher");
    setLoggedInTeacher("");
    history.push("/");
  };

  const onSignIn = () => {
    localStorage.setItem("loggedInTeacher", "אמיר");
    setLoggedInTeacher("אמיר");
    history.push("/");
    history.go(0);
  };

  useEffect(() => {
    if (localStorage.getItem("loggedInTeacher")) {
      setLoggedInTeacher(localStorage.getItem("loggedInTeacher"));
    } else {
      setLoggedInTeacher("");
    }
  });
  return (
    <BrowserRouter>
      <Navbar loggedInTeacher={loggedInTeacher} onSignOut={onSignOut} />
      <div className="container">
        <Switch>
          <Route exact path="/" component={AllProjects} />
          {/* <Route
          exact
          path="/DisplayProject/:projectid"
          component={DisplayProject}
        /> */}
          {/* <Route exact path="/AllProjects" component={AllProjects} /> */}
          <Route exact path="/DisplayProject" component={DisplayProject} />
          <Route exact path="/Signin" component={SignIn} />
          <Route exact path="/Addproject" component={AddProject} />
          {/* <Route exact path="/EditPreview/:projectid" component={EditPreview} /> */}
          <Route exact path="/EditPreview" component={EditPreview} />
          {/* <Route
          exact
          path="/pendingProjects/:teacherid"
          component={PendingProjects}
        /> */}
          <Route exact path="/:id/Projects" component={TeacherProjects} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
