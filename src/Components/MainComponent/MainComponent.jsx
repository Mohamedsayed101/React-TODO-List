// MainComponent.jsx
import { useState, useEffect, useMemo } from "react";

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

// Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Toast
import { useToast } from "../../Contexts/ToastContext";

// Todos Context
import { useTodo, useDispatch } from "../../Contexts/TodoContext";

export default function MainComponent() {
  const [titleInput, setTitleInput] = useState("");
  const [displayCategoryBtn, setDisplayCategoryBtn] = useState("all");
  const [dialogDeleteTodo, setDialogDeleteTodo] = useState(null);
  const [dialogUpdateTodo, setDialogUpdateTodo] = useState(null);

  // Dialog States
  const [updateTodo, setUpdateTodo] = useState({ title: "", description: "" });
  const [showDialogDelete, setShowDialogDelete] = useState(false);
  const [showDialogUpdate, setShowDialogUpdate] = useState(false);

  // refactor the coed with useReducer
  const todo  = useTodo();
  const dispatch = useDispatch();

  // Toast Context
  let { showToast } = useToast();

  // Completed Tasks
  const completedList = useMemo(() => {
    console.log("Completed Task From useMemo");
    return todo.filter((t) => {
      return t.isCompleted;
    });
  }, [todo]);

  //InCompleted Tasks

  const inCompletedList = useMemo(() => {
    console.log("InCompleted Task From useMemo");
    return todo.filter((t) => {
      return !t.isCompleted;
    });
  }, [todo]);

  let TodoToBeRendered = todo;
  if (displayCategoryBtn === "completed") TodoToBeRendered = completedList;
  else if (displayCategoryBtn === "inCompleted")
    TodoToBeRendered = inCompletedList;

  const toDoList = TodoToBeRendered.map((task) => (
    <Task
      key={task.id}
      task={task}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
    />
  ));

  useEffect(() => {
    dispatch({
      type: "getFormLocalStorage",
    });
  }, []);

  function addTask() {
    dispatch({
      type: "addedTask",
      payload: {
        titleInput,
      },
    });
    setTitleInput("");
    showToast("Add Task successfully!");
  }

  function handleCategoryBtn(e) {
    setDisplayCategoryBtn(e.target.value);
  }

  function deleteTask() {
    dispatch({ type: "deletedTask", payload: { ID: dialogDeleteTodo.id } });
    setShowDialogDelete(false);
    showToast("Task deleted!", "error");
  }

  function handleDelete(task) {
    setShowDialogDelete(true);
    setDialogDeleteTodo(task);
  }

  function handleUpdate(task) {
    setShowDialogUpdate(true);
    setDialogUpdateTodo(task);
    setUpdateTodo({ title: task.title, description: task.description });
  }

  function updateTask() {
    if (updateTodo.title) {
      dispatch({
        type: "updatedTask",
        payload: {
          updateTodo,
          ID: dialogUpdateTodo.id,
        },
      });
      setShowDialogUpdate(false);
      showToast("Task updated!", "info");
    }
  }

  return (
    <>
      {/* Start Delete Dialog */}
      <Dialog
        onClose={() => setShowDialogDelete(false)}
        open={showDialogDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Task"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this task: "
            {dialogDeleteTodo ? dialogDeleteTodo.title : ""}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialogDelete(false)}>Cancel</Button>
          <Button autoFocus onClick={deleteTask}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {/* End Delete Dialog */}

      {/* Start Update Dialog */}
      <Dialog
        onClose={() => {
          setShowDialogUpdate(false);
        }}
        open={showDialogUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Update Task"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Task Title"
            value={updateTodo.title}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="desc"
            name="description"
            label="Task description"
            value={updateTodo.description}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, description: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialogUpdate(false)}>Cancel</Button>
          <Button autoFocus onClick={updateTask}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
      {/* End update Dialog */}

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
              <ToggleButton value="completed" aria-label="centered">
                Complete
              </ToggleButton>
              <ToggleButton value="inCompleted" aria-label="right aligned">
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
