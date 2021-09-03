import "./App.css";
import "@fontsource/roboto";
import AddProject from "./AddProject";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Directions from "./Directions";
import AllProjects from "./AllProjects";
import Navbar from "./Navbar";
import EditPreview from "./EditPreview";
import SignIn from "./SignIn";
import PendingProjects from "./PendingProjects";
import HomePage from "./HomePage";
import ProjectDisplay from "./ProjectDisplay";

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
        <Route exact path="/ProjectDisplay" component={ProjectDisplay} />
        <Route exact path="/Signin" component={SignIn} />
        <Route exact path="/Addproject" component={AddProject} />
        <Route exact path="/Directions" component={Directions} />
        <Route exact path="/AllProjects" component={AllProjects} />
        <Route exact path="/EditPreview" component={EditPreview} />
        <Route exact path="/pendingProjects" component={PendingProjects} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
