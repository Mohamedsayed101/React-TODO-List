// MainComponent.jsx
import { useState, useContext, useEffect } from "react";
import { TodoContext } from "../../Contexts/TodoContext";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Task from "../Task/Task";
import Button from "@mui/material/Button";

// to create a ID
import { v4 as createId } from "uuid";

export default function MainComponent() {
  const { todo, setTodo } = useContext(TodoContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayCategoryBtn, setDisplayCategoryBtn] = useState("all");

  // Completed Tasks
  const completedList = todo.filter((t) => {
    return t.isCompleted;
  });
  //InCompleted Tasks

  const inCompletedList = todo.filter((t) => {
    return !t.isCompleted;
  });

  let TodoToBeRendered = todo;
  if (displayCategoryBtn === "completed") TodoToBeRendered = completedList;
  else if (displayCategoryBtn === "inCompleted")
    TodoToBeRendered = inCompletedList;

  const toDoList = TodoToBeRendered.map((task) => <Task key={task.id} task={task} />);
  useEffect(() => {
    const storageList = JSON.parse(localStorage.getItem("todo")) || [];
    setTodo(storageList);
  }, []);

  function addTask() {
    if (!titleInput.trim()) return;
    const newTask = {
      id: createId(),
      title: titleInput.trim(),
      description: "",
      isCompleted: false,
    };
    const update = [...todo, newTask];
    setTodo(update);
    localStorage.setItem("todo", JSON.stringify(update));
    setTitleInput("");
  }

  function handleCategoryBtn(e) {
    setDisplayCategoryBtn(e.target.value);
  }

  return (
    <>
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              variant="h2"
              textAlign="center"
              sx={{ fontWeight: "bold", fontStyle: "italic" }}
            >
              My List
            </Typography>
            <Divider />
            {/* Filter Buttons */}
            <ToggleButtonGroup
              sx={{ marginTop: "25px" }}
              value={displayCategoryBtn}
              exclusive
              onChange={handleCategoryBtn}
            >
              <ToggleButton value="all" aria-label="left aligned">
                All
              </ToggleButton>
              <ToggleButton
                value="completed"
                aria-label="centered"
              >
                Complete
              </ToggleButton>
              <ToggleButton
                value="inCompleted"
                aria-label="right aligned"
              >
                Incomplete
              </ToggleButton>
            </ToggleButtonGroup>
            {/* ==== Filter Buttons ==== */}
            <Box
              sx={{
                maxHeight: 500,
                overflowY: "auto",
              }}
            >
              {toDoList}
            </Box>
            <Grid
              container
              spacing={2}
              sx={{ marginTop: 2, alignItems: "stretch" }}
            >
              <Grid sx={{ flex: 2 }}>
                <TextField
                  fullWidth
                  label="Task Title"
                  variant="outlined"
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                />
              </Grid>
              <Grid sx={{ flex: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ height: "100%" }}
                  onClick={addTask}
                  disabled={titleInput.trim().length === 0}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
