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
  //   const postMessage = async () => {
  //     try {
  //       const res = await Axios.post("http://localhost:5000/msg/", {
  //         name: "דניאל כפיר",
  //         text: "הודעה שעובדת",
  //         projectId: "6138c4dce63c661fbca2922e",
  //         fromTeacher: false,
  //       });
  //       console.log(res.data);
  //     } catch (e) {
  //       // try {
  //       //   const res = await Axios.post("http://localhost:5000/projects/", {
  //       //     title: "project200",
  //       //     teacherId: "6138c4dce63c661fbca2922a",
  //       //     workshopId: "6138c4dce63c661fbca2922b",
  //       //     studentList: [
  //       //       {
  //       //         firstName: "d",
  //       //         lastName: "d",
  //       //         mail: "d",
  //       //         id: "m",
  //       //       },
  //       //     ],
  //       //     imgLink: "imglink",
  //       //     preview: "preview preview preview",
  //       //     status: "pendingTeacherApproval",
  //       //     githubLink: "htttp://github...",
  //       //     contactName: "sagiv",
  //       //     contactPhone: "0522222222",
  //       //     contactEmail: "sagivle@mta.ac.il",
  //       //     lastUpdateByStudent: "1232131231231231231231",
  //       //   });
  //       //   console.log(res.data);
  //       // }
  //       console.log(e);
  //     }
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
