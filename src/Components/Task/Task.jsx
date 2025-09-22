// Task.jsx

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// Icons Group
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// Toast
import { useToast } from "../../Contexts/ToastContext";

// Reducer Code
// import { useDispatch } from "../../Contexts/TodoContext";

// Redux Code
import { checkedTodoTask } from "../../Features/TodoSlice/TodoSlice";
import { useDispatch } from "react-redux";

export default function Task({ task, handleDelete, handleUpdate }) {
  // const dispatch = useDispatch();

  // Redux code
  const dispatch = useDispatch();

  const title = task.title;
  const desc = task.description;

  const { showToast } = useToast();

  return (
    <div>
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
                  // dispatch({
                  //   type: "CheckedTask",
                  //   payload: {
                  //     task,
                  //   },
                  dispatch(checkedTodoTask({ id: task.id }));
                  // لو بقى Completed
                  if (!task.isCompleted) {
                    showToast("Task marked as completed ✅", "success");
                  } else {
                    showToast("Task marked as inCompleted ❌", "warning");
                  }
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
                onClick={() => {
                  handleUpdate(task);
                }}
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
                onClick={() => {
                  handleDelete(task);
                }}
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
