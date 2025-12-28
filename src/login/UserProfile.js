import { Box, Divider, Grid, Modal, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import apiCall from "../HTTPRequest";
import UserAddressComponent from "./UserAddressComponent";
import AddUserAddressComponent from "./AddUserAddressComponent";
import AddIcon from '@mui/icons-material/Add';

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState({});
  const [userAddresses, setUserAddresses] = useState([]);
  const [addAddressModalOpen, setAddAddressModalOpen] = useState(false);
  useEffect(() => {
    async function fetchProfile() {
      const response = await apiCall('user-service/user-profile');
      if (response) {
        const responseData = JSON.parse(response);
        setUserProfile(responseData);
        setUserAddresses(responseData.userAddresses);
      }
    }
    fetchProfile();
  }, []);
  return (
    <> {userProfile ? (
      <Box display="flex" mx={{ xs: 1, sm: 6, md: 10 }} sx={{ justifyContent: "center" }}>
        <Paper sx={{ boxShadow: "0px 2px 2px -1px rgba(167, 250, 232, 1),0px 1px 2px 1px rgba(167, 250, 232, 1),1px 1px 3px 0px rgba(167, 250, 232, 0.5)", borderRadius: "5px !important", margin: "10px", width: { xs: "clamp(30px, 90vw, 1200px)", sm: "clamp(30px, 70vw, 1200px)", md: "clamp(30px, 60vw, 1000px)" } }}>
          <Typography sx={{
            fontSize: "clamp(0.7rem, 1.5vw, 1.9rem)",
            flexWrap: "wrap",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
            fontFamily: "Amazon Ember, Arial, sans-serif",
            padding: 2
          }}><strong>Profile</strong></Typography>
          <Divider />
          <Grid ml={3} container mb={3} mt={3}>
            <Grid container mt={1} mb={1} size={{ xs: 12, md: 6 }} display="flex" justifyContent="flex-start" alignItems="center">
              <Box>
                <Typography>UserName:</Typography>
              </Box>
              <Typography>{userProfile?.username}</Typography>
            </Grid>
            <Grid container mt={1} mb={1} size={{ xs: 12, md: 6 }} display="flex" justifyContent="flex-start" alignItems="center">
              <Box>
                <Typography>Email:</Typography>
              </Box>
              <Typography>{userProfile?.email}</Typography>
            </Grid>
          </Grid>
          <Divider><strong>Address Details</strong></Divider>
          {userAddresses && userAddresses.map((address, index) => (
            <Box key={index}>
              <UserAddressComponent address={address} />
              <Divider />
            </Box>
          ))}
          <Divider />
          <AddIcon onClick={() => { setAddAddressModalOpen(true) }} sx={{ margin: 2, color: '#F77793' }} />
          <Modal open={addAddressModalOpen}
            onClose={() => setAddAddressModalOpen(false)}
            BackdropProps={{
              sx: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(4px)"
              }
            }}
          >
            <Box sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              outline: "none",
              backgroundColor: "#fdfcf6ff",
              border: "0px",
              borderRadius: 2
            }} >
              <AddUserAddressComponent userAddresses={userAddresses} setUserAddresses={setUserAddresses} />
            </Box>
          </Modal>
        </Paper>
      </Box>
    ) : (<></>)}
    </>
  );
}