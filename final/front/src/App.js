import "./App.css";
import "@fontsource/roboto";
import AddProject from "./AddProject";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Directions from "./Directions";
import AllProjects from "./AllProjects";
import Navbar from "./Navbar";
import EditPreview from "./EditPreview";
import SignIn from "./SignIn";
import PendingProjects from "./PendingProjects";
import HomePage from "./HomePage";
import { useEffect, useState } from "react";
const App = () => {
  const [loggedInTeacher, setLoggedInTeacher] = useState("");

  useEffect(() => {
    if (localStorage.getItem("loggedInTeacher")) {
      setLoggedInTeacher(localStorage.getItem("loggedInTeacher"));
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar loggedInTeacher={loggedInTeacher} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/Signin" component={SignIn} />
        <Route path="/Addproject" component={AddProject} />
        <Route path="/Directions" component={Directions} />
        <Route path="/AllProjects" component={AllProjects} />
        <Route path="/EditPreview" component={EditPreview} />
        <Route path="/pendingProjects" component={PendingProjects} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
