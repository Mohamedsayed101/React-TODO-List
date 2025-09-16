import { createContext, useState, useContext } from "react";
import Alerts from "../Components/Alerts/Alerts";

let ToastContext = createContext({});

export let ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");
  function showToast(message = "Action completed!", toastSeverity = "success") {
    setMessage(message);
    setToastSeverity(toastSeverity);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Alerts open={open} message={message} toastSeverity={toastSeverity} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
