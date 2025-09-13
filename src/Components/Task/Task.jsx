// Task.jsx
import { useContext, useState } from "react";
import { TodoContext } from "../../Contexts/TodoContext";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

// Icons Group
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import TextField from "@mui/material/TextField";

// Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Task({ task }) {
  const { todo, setTodo } = useContext(TodoContext);
  const title = task.title;
  const desc = task.description;
  const [updateTodo, setUpdateTodo] = useState({
    title: title,
    description: desc,
  });
  const [showDailogDelete, setShowDailogDelete] = useState(false);
  const [showDailogUpdate, setShowDailogUpdate] = useState(false);

  function handleDelete() {
    setShowDailogDelete(true);
  }
  function handleUpdate() {
    setShowDailogUpdate(true);
  }

  function deleteTask() {
    const updateToDo = todo.filter((t) => t.id !== task.id);
    setTodo(updateToDo);
    setShowDailogDelete(false);
    localStorage.setItem("todo", JSON.stringify(updateToDo));
  }

  function updateTask() {
    if (updateTodo.title) {
      setTodo(
        todo.map((t) => {
          return t.id === task.id
            ? {
                ...t,
                title: updateTodo.title,
                description: updateTodo.description,
              }
            : t;
        })
      );
      setShowDailogUpdate(false);
    }
  }
  return (
    <div>
      <Dialog
        open={showDailogDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Task"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this task: "{title}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDailogDelete(false)}>Cancel</Button>
          <Button autoFocus onClick={deleteTask}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showDailogUpdate}
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
          <Button onClick={() => setShowDailogUpdate(false)}>Cancel</Button>
          <Button autoFocus onClick={updateTask}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          backgroundColor: task.isCompleted ? "green" : "#283593",
          color: "#fff",
          marginTop: 5,
          textDecoration: task.isCompleted ? "line-through" : "none",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography variant="h5" textAlign="left">
                {title}
              </Typography>
              <Typography variant="h6" textAlign="left">
                {desc}
              </Typography>
            </Grid>
            <Grid
              size={4}
              display="flex"
              alignItems="center"
              justifyContent="space-around"
            >
              <IconButton
                className="icon-btns"
                aria-label="Check"
                sx={{
                  backgroundColor: task.isCompleted ? "#fff" : "green",
                  color: task.isCompleted ? "#8bc34a" : "#fff",
                  border: "solid 3px #8bc34a",
                }}
                onClick={() => {
                  const updateToDo = todo.map((t) =>
                    t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
                  );
                  setTodo(updateToDo);
                  localStorage.setItem("todo", JSON.stringify(updateToDo));
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* Update Btn */}
              <IconButton
                className="icon-btns"
                aria-label="Edit"
                sx={{
                  backgroundColor: "#fff",
                  color: "#724ac3ff",
                  border: "solid 3px #724ac3ff",
                }}
                onClick={handleUpdate}
              >
                <EditOutlinedIcon />
              </IconButton>
              {/* Update Btn */}
              {/* Delete Btn */}
              <IconButton
                className="icon-btns"
                aria-label="Delete"
                sx={{
                  color: "rgba(162, 16, 16, 1)",
                  backgroundColor: "#fff",
                  border: "3px solid #f00",
                }}
                onClick={handleDelete}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              {/* Delete Btn */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
