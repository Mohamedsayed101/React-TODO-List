import { v4 as createId } from "uuid";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Todo: [],
};

export const TodoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    addTodoTask: (currentState, action) => {
      const titleInput = action.payload;
      if (!titleInput.trim()) return;

      const newTask = {
        id: createId(),
        title: titleInput.trim(),
        description: "",
        isCompleted: false,
      };

      currentState.Todo.push(newTask);
      localStorage.setItem("todo", JSON.stringify(currentState.Todo));
    },

    deleteTodoTask: (currentState, action) => {
      const id = action.payload.ID;
      currentState.Todo = currentState.Todo.filter((t) => t.id !== id);
    },

    updateTodoTask: (currentState, action) => {
      const { ID, updateTodo } = action.payload;
      currentState.Todo = currentState.Todo.map((t) =>
        t.id === ID
          ? {
              ...t,
              title: updateTodo.title,
              description: updateTodo.description,
            }
          : t
      );
      localStorage.setItem("todo", JSON.stringify(currentState.Todo));
    },

    checkedTodoTask: (currentState, action) => {
      const { id } = action.payload;
      currentState.Todo = currentState.Todo.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
      );
      localStorage.setItem("todo", JSON.stringify(currentState.Todo));
    },

    getFormLocalStorage: (currentState) => {
      const storageList = JSON.parse(localStorage.getItem("todo")) || [];
      currentState.Todo = storageList;
    },
  },
});

export const {
  addTodoTask,
  deleteTodoTask,
  updateTodoTask,
  checkedTodoTask,
  getFormLocalStorage,
} = TodoSlice.actions;
export default TodoSlice.reducer;
