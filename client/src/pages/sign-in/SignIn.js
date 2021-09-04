import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { teacherLogin } from "../../redux/securitySlice";
import "./SignIn.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(teacherLogin());
    history.push("/1/projects");
  };

  return (
    <div className="signin-container">
      <div className="page-title">התחבר למערכת</div>
      <form className="signin-form">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="כתובת מייל"
          name="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="סיסמה"
          name="password"
          type="password"
        />
        <button
          className="signin-button"
          onClick={(e) => {
            onSubmit(e);
          }}
          type="submit"
        >
          כניסה
        </button>
      </form>
    </div>
  );
};

export default SignIn;
