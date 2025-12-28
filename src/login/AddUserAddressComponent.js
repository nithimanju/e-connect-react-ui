import { Box, Button, FormControl, FormLabel, Grid, TextField, Typography } from "@mui/material";
import apiCall from "../HTTPRequest";

export default function AddUserAddressComponent(props) {
    const { userAddresses, setUserAddresses } = props;
    const saveAddress = (event) => {

        event.preventDefault();
        const addressName = document.getElementById('add-up-address-name').value;
        const street = document.getElementById('add-up-street-name').value;
        const city = document.getElementById('add-up-city').value;
        const zipCode = document.getElementById('add-up-zipcode').value;
        const country = document.getElementById('add-up-country').value;
        const addresses = [{
            addressName: addressName,
            addressNickName: addressName,
            street: street,
            city: city,
            zipCode: zipCode,
            country: country
        }];
        apiCall("/user-service/user-address", "POST", addresses).then((data) => {
            if (data) {
                const newAddress = JSON.parse(data);
                setUserAddresses([...userAddresses, newAddress]);
            }
        });
    };

    return (
        <Box component="form">
            <Grid ml={3} container mb={3} mt={3}>
                <Grid container mt={1} mb={1} size={{ xs: 12, md: 6 }} display="flex" justifyContent="flex-start" alignItems="center">
                    <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
                        <FormLabel sx={{ py: 1.6, color: "#F77793" }} htmlFor="email"><strong>Address Name:</strong></FormLabel>
                        <TextField
                            id="add-up-address-name"
                            type="text"
                            name="add-up-address-name"
                            placeholder="address name"
                            autoComplete="address name"
                            autoFocus
                            required
                            fullWidth
                            variant="standard"
                            sx={{ paddingLeft: 2, width: "90%", border: "0px" }}
                        />
                    </FormControl>
                </Grid>
                <Grid container mt={1} mb={1} size={{ xs: 12, md: 6 }} display="flex" justifyContent="flex-start" alignItems="center">
                    <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
                        <FormLabel sx={{ py: 1.6, color: "#F77793" }} htmlFor="email"><strong>Street Name:</strong></FormLabel>
                        <TextField
                            id="add-up-street-name"
                            type="text"
                            name="add-up-street-name"
                            placeholder="street name"
                            autoComplete="street name"
                            autoFocus
                            required
                            fullWidth
                            variant="standard"
                            sx={{ paddingLeft: 2, width: "90%", border: "0px" }}
                        />
                    </FormControl>
                </Grid>
                <Grid container mt={1} mb={1} size={{ xs: 12, md: 6 }} display="flex" justifyContent="flex-start" alignItems="center">
                    <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
                        <FormLabel sx={{ py: 1.6, color: "#F77793" }} htmlFor="email"><strong>City:</strong></FormLabel>
                        <TextField
                            id="add-up-city"
                            type="text"
                            name="add-up-city"
                            placeholder="city"
                            autoComplete="city"
                            autoFocus
                            required
                            fullWidth
                            variant="standard"
                            sx={{ paddingLeft: 2, width: "90%", border: "0px" }}
                        />
                    </FormControl>
                </Grid>
                <Grid container mt={1} mb={1} size={{ xs: 12, md: 6 }} display="flex" justifyContent="flex-start" alignItems="center">
                    <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
                        <FormLabel sx={{ py: 1.6, color: "#F77793" }} htmlFor="email"><strong>ZipCode:</strong></FormLabel>
                        <TextField
                            id="add-up-zipcode"
                            type="text"
                            name="add-up-zipcode"
                            placeholder="zipcode"
                            autoComplete="zipcode"
                            autoFocus
                            required
                            fullWidth
                            variant="standard"
                            sx={{ paddingLeft: 2, width: "90%", border: "0px" }}
                        />
                    </FormControl>
                </Grid>
                <Grid container mt={1} mb={1} size={{ xs: 12, md: 6 }} display="flex" justifyContent="flex-start" alignItems="center">
                    <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
                        <FormLabel sx={{ py: 1.6, color: "#F77793" }} htmlFor="country"><strong>Country:</strong></FormLabel>
                        <TextField
                            id="add-up-country"
                            type="text"
                            name="add-up-country"
                            placeholder="country"
                            autoComplete="country"
                            autoFocus
                            required
                            fullWidth
                            variant="standard"
                            sx={{ paddingLeft: 2, width: "90%", border: "0px" }}
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <Box width="100%" display="flex" justifyContent="center" alignItems="center" >
                <Button
                    sx={{ my: 4, backgroundColor: "#F77793" }}
                    type="submit"
                    variant="contained"
                    onClick={saveAddress}
                >
                    Save Address
                </Button>
            </Box>
        </Box>
    );
}