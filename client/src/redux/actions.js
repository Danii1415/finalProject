import { TEACHER_LOGIN } from "./actionTypes";

export const teacherLogin = () => {
  return (dispatch) => {
    dispatch({ type: TEACHER_LOGIN });
  };
};
