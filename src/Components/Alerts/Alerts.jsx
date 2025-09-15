import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Alerts({ open, message, toastSeverity }) {
  return (
    <div>
      <Snackbar open={open} autoHideDuration={2000}>
        <Alert severity={toastSeverity} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
