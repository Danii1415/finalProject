import { createSlice } from "@reduxjs/toolkit";

export const securitySlice = createSlice({
  name: "security",
  initialState: {
    loggedInTeacher: "",
  },
  reducers: {
    teacherLogin: (state, teacherId) => {
      localStorage.setItem("loggedInTeacher", teacherId);
      state.loggedInTeacher = teacherId.payload;
    },
    teacherLogout: (state) => {
      localStorage.removeItem("loggedInTeacher");
      state.loggedInTeacher = "";
    },
  },
});

export const { teacherLogin, teacherLogout } = securitySlice.actions;

export default securitySlice.reducer;
