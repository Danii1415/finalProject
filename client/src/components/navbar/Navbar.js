import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../images/academLogo.jpeg";

const Navbar = ({ loggedInTeacher, onSignOut }) => {
  const history = useHistory();
  // const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState(false);
  useEffect(() => {
    console.log("nav");
  }, []);

  console.log("loggedInTeacher", loggedInTeacher);

  return (
    <div className="navbar-container">
      <div className="navbar-links-header">
        <img className="logo" src={logo} alt="logo" />
        <div className="links">
          <Link to="/" className="link  primary">
            כל הפרוייקטים
          </Link>
          {loggedInTeacher ? (
            <div className="link" onClick={onSignOut}>
              התנתק
            </div>
          ) : (
            <Link to="/Signin" className="link">
              כניסת מרצה
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
