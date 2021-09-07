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
const App = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const postData = async () => {
  //     try {
  //       const res = await Axios.post("http://localhost:5000/students/", {
  //         firstName: "dani",
  //         lastName: "d",
  //         id: "123",
  //         mail: "mail@mail",
  //       });
  //       console.log(res.data);
  //     } catch (e) {}
  //   };
  //   postData();
  // }, []);
  useEffect(() => {
    const postData = async () => {
      try {
        const res = await Axios.post("http://localhost:5000/students/");
        console.log(res.data);
      } catch (e) {}
    };
    postData();
  }, []);
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
          <Route exact path="/DisplayProject" component={DisplayProject} />
          <Route exact path="/Signin" component={SignIn} />
          <Route exact path="/Addproject" component={AddProject} />
          <Route exact path="/EditProject" component={EditProject} />
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
