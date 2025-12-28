import { useContext } from "react";
import { ApplicationContext } from "../ApplicationContext";
import { Alert, Snackbar } from "@mui/material";

export default function AlertComponent() {
  const { isDisplayAlterMessage, displayAlterMessage, setIsDisplayAlterMessage } = useContext(ApplicationContext);
  const vertical = 'top';
  const horizontal = 'right';
  return (<Snackbar
    open={isDisplayAlterMessage}
    autoHideDuration={3000}
    onClose={() => setIsDisplayAlterMessage(false)}
    key="fade"
    anchorOrigin={{ vertical, horizontal }}
  >
    <Alert
      onClose={() => setIsDisplayAlterMessage(false)}
      severity="success"
      sx={{ width: '100%' }}
    >
      {displayAlterMessage}
    </Alert>
  </Snackbar>);
}