import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function HeaderAddressSelector(props) {
  const [selectedAddress, setSelectedAddress] = useState(props.addressList ? props.addressList[0] : {});
  const addresses = props.addressList;

  const handleChange = (event) => {
    setSelectedAddress(event.target.value);
    handleClick();
  };
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <Select
        id="demo-simple-select"
        value={selectedAddress}
        onChange={handleChange}
        sx={{ display: "flex", "& .MuiSvgIcon-fontSizeMedium": { display: "none" }, "& .MuiOutlinedInput-notchedOutline": { borderColor: "#a7fae8" } }}
      >
        {addresses.map(element => {
          return <MenuItem key={element.addressId} value={element}>{element.addressName}</MenuItem>;
        })}
      </Select>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        key="fade"
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%', backgroundColor: "#F4476D" }}
        >
          Address has been updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
}