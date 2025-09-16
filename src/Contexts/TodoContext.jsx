import { createContext, useReducer, useContext } from "react";
import ToDoReducer from "../Reducers/ToDoReducer";

const TodoContext = createContext([]);
const DispatchContext = createContext(() => {});

const TodoProvider = ({ children }) => {
  const [todo, dispatch] = useReducer(ToDoReducer, []);

  return (
    <TodoContext.Provider value={todo}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
export const useDispatch = () => useContext(DispatchContext);

export default TodoProvider;
