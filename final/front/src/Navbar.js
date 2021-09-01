import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.scss";
import logo from "./academLogo.jpeg";

const Navbar = ({ loggedInTeacher, onSignOut }) => {
  const history = useHistory();
  // const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState(false);
  useEffect(() => {
    console.log("nav");
  }, []);
  return (
    <div className="navbar-container">
      <div className="navbar-links-header">
        {loggedInTeacher ? (
          <div class="teacher-menu-dropdown">
            <button class="dropbtn">שלום {loggedInTeacher}</button>
            <div class="dropdown-content">
              <Link>סדנאות שאושרו</Link>
              <Link>סדנאות שלא אושרו</Link>
              <button onClick={onSignOut}>צא</button>
            </div>
          </div>
        ) : (
          <Link to="/Signin" className="link margin-left">
            כניסת מרצה
          </Link>
        )}
        <div className="navbar-general-menu">
          <Link to="/directions" className="link">
            דרכי הגעה
          </Link>
          <Link to="/ProjectsList" className="link">
            רשימת הפרויקטים
          </Link>
          <Link to="/allProjects" className="link">
            כל הפרויקטים
          </Link>
          <Link to="/" className="link">
            ראשי
          </Link>
        </div>
      </div>
      <img className="logo" src={logo} alt="logo" />
    </div>
  );
};

export default Navbar;
