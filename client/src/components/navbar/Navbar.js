import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../images/academLogo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { teacherLogout } from "../../redux/securitySlice";

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedInTeacher = useSelector(
    (state) => state.security.loggedInTeacher
  );

  const onSignOut = () => {
    dispatch(teacherLogout());
  };

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
