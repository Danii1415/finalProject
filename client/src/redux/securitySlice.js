import { createSlice } from "@reduxjs/toolkit";

export const securitySlice = createSlice({
  name: "security",
  initialState: {
    loggedInTeacher: "",
  },
  reducers: {
    teacherLogin: (state) => {
      localStorage.setItem("loggedInTeacher", "אמיר");
      state.loggedInTeacher = "1234";
    },
    teacherLogout: (state) => {
      localStorage.removeItem("loggedInTeacher");
      state.loggedInTeacher = "";
    },
  },
});

export const { teacherLogin, teacherLogout } = securitySlice.actions;

export default securitySlice.reducer;
