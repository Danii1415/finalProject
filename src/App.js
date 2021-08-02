import "./App.css";
import "@fontsource/roboto";
import AddProject from "./AddProject";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Directions from "./Directions";
import EditWorkshop from "./EditWorkshop";
import AllWorkshops from "./AllWorkshops";
import Navbar from "./Navbar";
import { useEffect } from "react";
import SignIn from "./SignIn";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/Signin" component={SignIn} />
        <Route path="/Addproject" component={AddProject} />
        <Route path="/Directions" component={Directions} />
        <Route path="/EditWorkshop" component={EditWorkshop} />
        <Route path="/AllWorkshops" component={AllWorkshops} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
