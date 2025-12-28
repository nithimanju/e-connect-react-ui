import { Box, Button, Divider, FormControl, FormLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import { useCallback, useContext, useState } from "react";
import apiCall from "../HTTPRequest";
import { GoogleIcon } from "../components/ExternalIconComponent";
import { ApplicationContext } from "../ApplicationContext";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const handleGoogleOAuthClick = useCallback(() => {
    window.location.href = window.__ENV__.API_BASE_URL+"/user-service/oauth2/authorization/google";
  }, []);
  const { setDisplayLoadingSpinner, setDisplayAlterMessage, setIsDisplayAlterMessage, isLoggedIn, setIsloggedIn } = useContext(ApplicationContext);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [checkIsLoggedIn, setCheckIsLoggedIn] = useState(isLoggedIn);
  const navigate = useNavigate();

  const validateInputs = () => {
    const email = document.getElementById('sign-up-email');
    const password = document.getElementById('sign-up-password');

    let isValid = true;
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };
  const handleSignUpSubmit = async (event) => {
    setDisplayLoadingSpinner('block');
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('sign-up-email'),
      password: data.get('sign-up-password'),
    });
    const address = {
      isPrimary: true,
      street: data.get('sign-up-street'),
      city: data.get('sign-up-city'),
      zipCode: data.get('sign-up-zipcode'),
      state: data.get('sign-up-state'),
      country: data.get('sign-up-country'),
      addressName: data.get('sign-up-address-name'),
      addressNickName: data.get('sign-up-address-name')
    };

    const userData = {
      username: data.get('sign-up-email'),
      password: data.get('sign-up-password'),
      email: data.get('sign-up-email'),
      userAddresses: [address]
    };
    event.preventDefault();
    const result = await apiCall("user-service/signup", "POST", userData);
    setDisplayLoadingSpinner('none');
    if (result === "Authenticated") {
      setIsloggedIn(true);
      setDisplayAlterMessage('Sign Up successfull');
      setIsDisplayAlterMessage(true);
      navigate("/");
    }
  };
  return (
    <>
      {
        checkIsLoggedIn ? (<Box>Already logged-in</Box>) :
          (
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
                }}><strong>SignUp</strong></Typography>
                <Divider />
                <Box
                  component="form"
                  onSubmit={handleSignUpSubmit}
                  noValidate
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                  }}>
                  <Grid container mb={3} mt={3}>
                    <Grid container mt={1} mb={1} size={{ xs: 12, md: 6 }} display="flex" justifyContent="center" alignItems="center">
                      <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
                        <FormLabel sx={{ py: 1.6, color: "#F77793" }} htmlFor="email"><strong>Email:</strong></FormLabel>
                        <TextField
                          error={emailError}
                          helperText={emailErrorMessage}
                          id="sign-up-email"
                          type="email"
                          name="sign-up-email"
                          placeholder="your@email.com"
                          autoComplete="email"
                          autoFocus
                          required
                          fullWidth
                          variant="standard"
                          color={emailError ? 'error' : 'primary'}
                          sx={{ paddingLeft: 2, width: "90%", border: "0px" }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid mt={1} mb={1} size={{ xs: 12, md: 6 }} display="flex" justifyContent="center" alignItems="center">
                      <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
                        <FormLabel sx={{ py: 1.6, color: "#F77793" }} htmlFor="password"><strong>Password:</strong></FormLabel>
                        <TextField
                          error={passwordError}
                          helperText={passwordErrorMessage}
                          name="sign-up-password"
                          placeholder="••••••"
                          type="password"
                          id="sign-up-password"
                          autoComplete="current-password"
                          autoFocus
                          required
                          fullWidth
                          variant="standard"
                          color={passwordError ? 'error' : 'primary'}
                          sx={{ paddingLeft: 2, width: "90%" }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid container mt={1} mb={1} size={{ xs: 12, md: 6 }} display="flex" justifyContent="center" alignItems="center">
                      <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
                        <FormLabel sx={{ py: 1.6, color: "#F77793" }} htmlFor="email"><strong>Name:</strong></FormLabel>
                        <TextField
                          id="sign-up-name"
                          type="email"
                          name="email"
                          placeholder="your name"
                          autoFocus
                          required
                          fullWidth
                          variant="standard"
                          color={emailError ? 'error' : 'primary'}
                          sx={{ paddingLeft: 2, width: "90%", border: "0px" }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid mt={1} mb={1} size={{ xs: 12, md: 6 }} display="flex" justifyContent="center" alignItems="center">
                      <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
                        <FormLabel sx={{ py: 1.6, color: "#F77793" }} htmlFor="sign-up-phone"><strong>Phone:</strong></FormLabel>
                        <TextField
                          name="Phone"
                          placeholder="Phone"
                          type="text"
                          id="sign-up-phone"
                          autoFocus
                          required
                          fullWidth
                          variant="standard"
                          sx={{ paddingLeft: 2, width: "90%" }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Divider><strong>Address Details</strong></Divider>
                  <Grid container mt={3} mb={3}>
                    <Grid container mt={1} mb={1} size={{ xs: 12, md: 6 }} display="flex" justifyContent="center" alignItems="center">
                      <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
                        <FormLabel sx={{ py: 1.6, color: "#F77793" }} htmlFor="email"><strong>Name:</strong></FormLabel>
                        <TextField
                          id="sign-up-address-name"
                          type="text"
                          name="sign-up-address-name"
                          placeholder="address name"
                          autoComplete="address name"
                          autoFocus
                          required
                          fullWidth
                          variant="standard"
                          color={emailError ? 'error' : 'primary'}
                          sx={{ paddingLeft: 2, width: "90%", border: "0px" }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid container mt={1} mb={1} size={{ xs: 12, md: 6 }} display="flex" justifyContent="center" alignItems="center">
                      <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
                        <FormLabel sx={{ py: 1.6, color: "#F77793" }} htmlFor="email"><strong>Street:</strong></FormLabel>
                        <TextField
                          id="sign-up-street"
                          type="text"
                          name="sign-up-street"
                          placeholder="street name"
                          autoComplete="street name"
                          autoFocus
                          required
                          fullWidth
                          variant="standard"
                          color={emailError ? 'error' : 'primary'}
                          sx={{ paddingLeft: 2, width: "90%", border: "0px" }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid mt={1} mb={1} size={{ xs: 12, md: 6 }} display="flex" justifyContent="center" alignItems="center">
                      <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
                        <FormLabel sx={{ py: 1.6, color: "#F77793" }} htmlFor="sign-up-city"><strong>City:</strong></FormLabel>
                        <TextField
                          id="sign-up-city"
                          type="text"
                          name="sign-up-city"
                          placeholder="City"
                          autoComplete="City"
                          autoFocus
                          required
                          fullWidth
                          variant="standard"
                          color={'primary'}
                          sx={{ paddingLeft: 2, width: "90%", border: "0px" }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid container mt={1} mb={1} size={{ xs: 12, md: 6 }} display="flex" justifyContent="center" alignItems="center">
                      <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
                        <FormLabel sx={{ py: 1.6, color: "#F77793" }} htmlFor="email"><strong>ZipCode:</strong></FormLabel>
                        <TextField
                          id="sign-up-zipcode"
                          type="text"
                          name="sign-up-zipcode"
                          placeholder="zipcode"
                          autoComplete="zipcode"
                          autoFocus
                          required
                          fullWidth
                          variant="standard"
                          color='primary'
                          sx={{ paddingLeft: 2, width: "90%", border: "0px" }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid container mt={1} mb={1} size={{ xs: 12, md: 6 }} display="flex" justifyContent="center" alignItems="center">
                      <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
                        <FormLabel sx={{ py: 1.6, color: "#F77793" }} htmlFor="sign-up-state"><strong>State:</strong></FormLabel>
                        <TextField
                          id="sign-up-state"
                          type="text"
                          name="sign-up-state"
                          placeholder="state"
                          autoFocus
                          required
                          fullWidth
                          variant="standard"
                          color='primary'
                          sx={{ paddingLeft: 2, width: "90%", border: "0px" }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid mt={1} mb={1} size={{ xs: 12, md: 6 }} display="flex" justifyContent="center" alignItems="center">
                      <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
                        <FormLabel sx={{ py: 1.6, color: "#F77793" }} htmlFor="sign-up-country"><strong>Country:</strong></FormLabel>
                        <TextField
                          name="sign-up-country"
                          placeholder="country"
                          type="text"
                          id="sign-up-country"
                          autoFocus
                          required
                          fullWidth
                          variant="standard"
                          sx={{ paddingLeft: 2, width: "90%" }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Box width="100%" display="flex" justifyContent="center" alignItems="center" >
                    <Button
                      sx={{ my: 4, backgroundColor: "#F77793" }}
                      type="submit"
                      variant="contained"
                      onClick={validateInputs}
                    >
                      Sign Up
                    </Button>
                  </Box>
                </Box>
                <Divider>or</Divider>
                <Box width="100%" display="flex" justifyContent="center" alignItems="center" >
                  <Button sx={{ my: 4, backgroundColor: "inherit", color: "black" }}
                    variant="contained" startIcon={<GoogleIcon />} onClick={handleGoogleOAuthClick}>
                    Continue with Google
                  </Button>
                </Box>
              </Paper>
            </Box>
          )
      }
    </>
  );
}