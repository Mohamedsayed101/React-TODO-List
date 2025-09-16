import { v4 as createId } from "uuid";

export default function ToDoReducer(currentTodo, action) {
  switch (action.type) {
    case "addedTask": {
      const { titleInput } = action.payload;

      if (!titleInput.trim()) return currentTodo;

      const newTask = {
        id: createId(),
        title: titleInput.trim(),
        description: "",
        isCompleted: false,
      };
      const update = [...currentTodo, newTask];
      localStorage.setItem("todo", JSON.stringify(update));
      return update;
    }

    case "deletedTask": {
      const dialogDeleteTodo = action.payload.ID;
      const updateToDo = currentTodo.filter((t) => t.id !== dialogDeleteTodo);
      localStorage.setItem("todo", JSON.stringify(updateToDo));
      return updateToDo;
    }

    case "updatedTask": {
      const dialogUpdateTodo = action.payload.ID;
      const updateTodo = action.payload.updateTodo;
      const updated = currentTodo.map((t) => {
        return t.id === dialogUpdateTodo
          ? {
              ...t,
              title: updateTodo.title,
              description: updateTodo.description,
            }
          : t;
      });
      localStorage.setItem("todo", JSON.stringify(updated));
      return updated;
    }

    case "CheckedTask": {
      const task = action.payload.task;
      const updateToDo = currentTodo.map((t) =>
        t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
      );
      localStorage.setItem("todo", JSON.stringify(updateToDo));
      return updateToDo;
    }

    case "getFormLocalStorage": {
      const storageList = JSON.parse(localStorage.getItem("todo")) || [];
      return storageList;
    }

    default: {
      throw new Error(`Action not found: ${action.type}`);
    }
  }
  // return [];
}
