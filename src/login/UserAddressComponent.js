import { Box, Grid, Typography } from "@mui/material";

export default function UserAddressComponent(props) {
    const address = props.address;
    return (
          <Grid ml={3} container mb={3} mt={3}>
            <Grid container mt={1} mb={1} size={{ xs: 12, md: 6 }} display="flex" justifyContent="flex-start" alignItems="center">
              <Box>
                <Typography><strong>Address Name:</strong></Typography>
              </Box>
              <Typography>{address?.addressName}</Typography>
            </Grid>
            <Grid container mt={1} mb={1} size={{ xs: 12, md: 6 }} display="flex" justifyContent="flex-start" alignItems="center">
              <Box>
                <Typography><strong>StreetName:</strong></Typography>
              </Box>
              <Typography>{address?.street}</Typography>
            </Grid>
            <Grid container mt={1} mb={1} size={{ xs: 12, md: 6 }} display="flex" justifyContent="flex-start" alignItems="center">
              <Box>
                <Typography><strong>City:</strong></Typography>
              </Box>
              <Typography>{address?.city}</Typography>
            </Grid>
            <Grid container mt={1} mb={1} size={{ xs: 12, md: 6 }} display="flex" justifyContent="flex-start" alignItems="center">
              <Box>
                <Typography><strong>ZipCode:</strong></Typography>
              </Box>
              <Typography>{address?.zipCode}</Typography>
            </Grid>
            <Grid container mt={1} mb={1} size={{ xs: 12, md: 6 }} display="flex" justifyContent="flex-start" alignItems="center">
              <Box>
                <Typography><strong>Country:</strong></Typography>
              </Box>
              <Typography>{address?.country}</Typography>
            </Grid>
          </Grid>
    );
}