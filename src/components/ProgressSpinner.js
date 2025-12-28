import { CircularProgress, Modal } from "@mui/material";

export default function CircularProgressSpinner(props) {
  const displayLoadingSpinner = props.displayLoadingSpinner;
  const isModelVisible = displayLoadingSpinner !== 'block' ? false : true;
  return (
    <Modal
      open={isModelVisible}
      BackdropProps={{
        sx: {
          backgroundColor: "transparent",
          backdropFilter: "blur(2px)",
        }
      }}
    >
      <CircularProgress sx={{
        display: `${displayLoadingSpinner}`,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        outline: "none"
      }} />
    </Modal>
  );
}