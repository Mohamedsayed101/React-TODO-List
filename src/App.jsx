// App.jsx
import "./App.css";
import MainComponent from "./Components/MainComponent/MainComponent";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastProvider } from "./Contexts/ToastContext";
import TodoProvider  from "./Contexts/TodoContext";

const theme = createTheme({
  typography: {
    fontFamily: ["Ubuntu"],
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastProvider>
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
            <TodoProvider>
              <MainComponent />
            </TodoProvider>
          </div>
        </ToastProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
