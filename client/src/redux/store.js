import { configureStore } from "@reduxjs/toolkit";
import securityReducer from "../redux/securitySlice";

export default configureStore({
  reducer: {
    security: securityReducer,
  },
});
