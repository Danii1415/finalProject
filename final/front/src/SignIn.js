import React, { useState } from "react";
import "./SignIn.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("loggedInTeacher", "אמיר");
    //sign in
  };

  return (
    <div className="signin-container">
      {/* <div className="title">כניסה למערכת</div> */}
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
