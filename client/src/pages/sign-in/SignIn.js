import React, { useState } from "react";
import { useHistory } from "react-router";
import "./SignIn.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("loggedInTeacher", "אמיר");
    history.push("/");
  };

  return (
    <div className="signin-container">
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
          היכנס למערכת
        </button>
      </form>
    </div>
  );
};

export default SignIn;
