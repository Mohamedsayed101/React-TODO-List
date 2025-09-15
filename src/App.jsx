// App.jsx
import { useState } from "react";
import "./App.css";
import MainComponent from "./Components/MainComponent/MainComponent";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TodoContext } from "./Contexts/TodoContext";
import { ToastContext } from "./Contexts/ToastContext";
import Alerts from "./Components/Alerts/Alerts";

// to create a ID
import { v4 as createId } from "uuid";
// Toast States

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
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");

  function showToast(message = "Action completed!", toastSeverity="success") {
    setMessage(message);
    setToastSeverity(toastSeverity);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContext.Provider value={{ showToast }}>
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
              <Alerts
                open={open}
                message={message}
                toastSeverity={toastSeverity}
              />
            </TodoContext.Provider>
          </div>
        </ToastContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
