import "./App.css";
import "@fontsource/roboto";
import AddProject from "./pages/add-project/AddProject";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AllProjects from "./pages/all-projects/AllProjects";
import Navbar from "./components/navbar/Navbar";
import EditProject from "./pages/edit-project/EditProject";
import SignIn from "./pages/sign-in/SignIn";
import TeacherProjects from "./pages/teacher-projects/TeacherProjects";
import DisplayProject from "./pages/display-project/DisplayProject";
import Axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { teacherLogin } from "./redux/securitySlice";
import { SettingsRemote } from "@material-ui/icons";

const App = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const postMessage = async () => {
  //     try {
  //       const res = await Axios.get(
  //         "http://localhost:5000/get_image/613b1d62b6934531b51647a3/"
  //       );
  //       console.log(res);
  //     } catch (e) {}
  //   };
  //   postMessage();
  // }, []);

  useEffect(() => {
    if (localStorage.getItem("loggedInTeacher")) {
      dispatch(teacherLogin(localStorage.getItem("loggedInTeacher")));
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={AllProjects} />
          <Route
            exact
            path="/DisplayProject/:projectId"
            component={DisplayProject}
          />
          <Route exact path="/Signin" component={SignIn} />
          <Route exact path="/Addproject" component={AddProject} />
          <Route exact path="/EditProject/:projectId" component={EditProject} />
          <Route
            exact
            path="/:teacherId/Projects"
            component={TeacherProjects}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
