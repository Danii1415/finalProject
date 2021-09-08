//להוסיף שגיאה + שכחת סיסמא + קריאה לדאטה בייס

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { teacherLogin } from "../../redux/securitySlice";
import "./SignIn.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidForm, setIsValidForm] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (validateFields()) setIsValidForm(true);
    else setIsValidForm(false);
  });

  const validateFields = () => {
    return email && password;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // db call
    dispatch(teacherLogin("6136303f70a7bb817e044709"));
    history.push("/6136303f70a7bb817e044709/projects");
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
          // disabled={!isValidForm ? true : false}
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
