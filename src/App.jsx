// App.jsx
import { useState } from "react";
import "./App.css";
import MainComponent from "./Components/MainComponent/MainComponent";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TodoContext } from "./Contexts/TodoContext";

// to create a ID
import { v4 as createId } from "uuid";

const initial = [
  {
    id: createId(),
    title: "Task One",
    description: "This is Task One",
    isCompleted: false,
  },
  {
    id: createId(),
    title: "Task Two",
    description: "This is Task Two",
    isCompleted: false,
  },
  {
    id: createId(),
    title: "Task Three",
    description: "This is Task Three",
    isCompleted: false,
  },
];

const theme = createTheme({
  typography: {
    fontFamily: ["Ubuntu"],
  },
});

function App() {
  const [todo, setTodo] = useState(initial);
  return (
    <>
      <ThemeProvider theme={theme}>
        <div
          style={{
            width: "100%",
            height: "100vh",
            backgroundColor: "#100606f8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <TodoContext.Provider value={{ todo, setTodo }}>
            <MainComponent />
          </TodoContext.Provider>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
