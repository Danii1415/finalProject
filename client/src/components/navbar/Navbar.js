import React from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../images/academLogo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { teacherLogout } from "../../redux/securitySlice";
import "./Navbar.scss";

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
          {loggedInTeacher && (
            <button
              onClick={() => history.push(`/${loggedInTeacher}/projects`)}
              className="link"
            >
              הקורסים שלי
            </button>
          )}
          <button onClick={() => history.push("/")} className="link">
            כל הפרויקטים
          </button>
          {loggedInTeacher ? (
            <div className="button-link primary" onClick={onSignOut}>
              התנתק
            </div>
          ) : (
            <Link to="/Signin" className="button-link primary">
              כניסת מרצה
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
