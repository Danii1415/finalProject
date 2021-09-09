//להוסיף שגיאה + שכחת סיסמא +

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { teacherLogin } from "../../redux/securitySlice";
import Axios from "axios";
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
    try {
      const res = await Axios.post("http://localhost:5000/teachers/validate/", {
        mail: email,
        password: password,
      });
      if (res && res.data) {
        dispatch(teacherLogin(res.data._id));
        history.push(`/${res.data._id}/projects`);
      }
    } catch (e) {
      console.log(e);
    }
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
