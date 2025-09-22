import { configureStore } from "@reduxjs/toolkit";
import TodoSliceReducer from "../../src/Features/TodoSlice/TodoSlice";

export const store = configureStore({
  reducer: {
    todo: TodoSliceReducer,
  },
});
