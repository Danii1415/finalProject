import { TEACHER_LOGIN } from "./actionTypes";

const initialState = {
  loggedInTeacher: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TEACHER_LOGIN: {
      return {
        ...state,
        loggedInTeacher: {
          name: "אמיר",
        },
      };
    }
  }
}
