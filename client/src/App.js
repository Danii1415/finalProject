import "./App.css";
import "@fontsource/roboto";
import AddProject from "./pages/add-project/AddProject";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Directions from "./pages/directions/Directions";
import AllProjects from "./pages/all-projects/AllProjects";
import Navbar from "./components/navbar/Navbar";
import EditPreview from "./pages/edit-project/EditProject";
import SignIn from "./pages/sign-in/SignIn";
import PendingProjects from "./PendingProjects";
import HomePage from "./HomePage";
import ProjectDisplay from "./pages/project-display/ProjectDisplay";

import { useEffect, useState } from "react";
const App = () => {
  const [loggedInTeacher, setLoggedInTeacher] = useState("");
  const history = useHistory();

  const onSignOut = () => {
    localStorage.removeItem("loggedInTeacher");
    setLoggedInTeacher("");
    history.push("/");
    history.go(0);
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
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route
          exact
          path="/ProjectDisplay/:projectid"
          component={ProjectDisplay}
        /> */}
        <Route exact path="/ProjectDisplay" component={ProjectDisplay} />
        <Route exact path="/Signin" component={SignIn} />
        <Route exact path="/Addproject" component={AddProject} />
        <Route exact path="/Directions" component={Directions} />
        <Route exact path="/AllProjects" component={AllProjects} />
        {/* <Route exact path="/EditPreview/:projectid" component={EditPreview} /> */}
        <Route exact path="/EditPreview" component={EditPreview} />
        {/* <Route
          exact
          path="/pendingProjects/:teacherid"
          component={PendingProjects}
        /> */}
        <Route exact path="/pendingProjects" component={PendingProjects} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
