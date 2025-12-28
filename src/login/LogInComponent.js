import { useCallback, useContext, useState } from "react";
import { Box, Button, CircularProgress, Modal, Paper, Stack } from "@mui/material";

import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { GoogleIcon } from '../components/ExternalIconComponent';
import apiCall from "../HTTPRequest";
import { ApplicationContext } from "../ApplicationContext";

export default function LogInComponent(props) {
    const handleGoogleOAuthClick = useCallback(() => {
        window.location.href = window.__ENV__.API_BASE_URL+"/user-service/oauth2/authorization/google";
    }, []);
    const loginVisibilityStatus = props.loginVisibilityStatus;
    const setLoginVisibility = props.setLoginVisibility;
  const {isLoggedIn, setIsloggedIn} = useContext(ApplicationContext);
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [submitLoadingStatus, setSubmitLoadingStatus] = useState('none');
    const [buttonDisableStatus, setButtonDisableStatus] = useState(false);

    const validateInputs = () => {
        const email = document.getElementById('login-email');
        const password = document.getElementById('password');

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
    const handleSubmit = async (event) => {
        setSubmitLoadingStatus("block");
        setButtonDisableStatus(true);
        if (emailError || passwordError) {
            event.preventDefault();
            return;
        }
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        const userData = {
            username: data.get('email'),
            password: data.get('password'),
            email: data.get('email'),
        }
        event.preventDefault();
        const result = await apiCall("user-service/login", "POST", userData);
        setSubmitLoadingStatus("none");
        setButtonDisableStatus(false);
        if (result === "Authenticated") {
            setIsloggedIn(true);
            setLoginVisibility(false);
        }
    };
    return (
        <>
            <Modal
                open={loginVisibilityStatus}
                onClose={() => setLoginVisibility(false)}
                BackdropProps={{
                    sx: {
                        backgroundColor: "transparent",
                        backdropFilter: "blur(2px)",
                    }
                }}

            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        outline: "none"
                    }}
                >
                    <CircularProgress sx={{
                        display: `${submitLoadingStatus}`,
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        outline: "none"
                    }} />
                    <Paper
                        sx={{
                            boxShadow: "0px 2px 2px -1px rgba(167, 250, 232, 1),0px 1px 2px 1px rgba(167, 250, 232, 1),1px 1px 3px 0px rgba(167, 250, 232, 0.5)",
                            padding: 2,
                            borderRadius: 2,
                            width: { xs: "70vw", sm: "40vw", md: "25vw" }
                        }}
                    >
                        <Stack>
                            <Typography
                                py={1.5}
                                component="h1"
                                variant="h4"
                                sx={{ width: '100%', zIndex: "999", fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                            >
                                Sign in
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                noValidate
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    gap: 2,
                                }}>
                                <FormControl>
                                    <FormLabel sx={{ py: 1.6 }} htmlFor="email">Email</FormLabel>
                                    <TextField
                                        error={emailError}
                                        helperText={emailErrorMessage}
                                        id="login-email"
                                        type="email"
                                        name="email"
                                        placeholder="your@email.com"
                                        autoComplete="email"
                                        autoFocus
                                        required
                                        fullWidth
                                        variant="outlined"
                                        color={emailError ? 'error' : 'primary'}
                                        sx={{ paddingLeft: 2, width: "90%" }}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel sx={{ py: 1.6 }} htmlFor="password">Password</FormLabel>
                                    <TextField
                                        error={passwordError}
                                        helperText={passwordErrorMessage}
                                        name="password"
                                        placeholder="••••••"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        autoFocus
                                        required
                                        fullWidth
                                        variant="outlined"
                                        color={passwordError ? 'error' : 'primary'}
                                        sx={{ paddingLeft: 2, width: "90%" }}
                                    />
                                </FormControl>

                                <Button disabled={buttonDisableStatus}
                                    sx={{ my: 4, backgroundColor: "#F77793" }}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={validateInputs}
                                >
                                    Sign in
                                </Button>
                            </Box>
                            <Divider>or</Divider>

                            <Button disabled={buttonDisableStatus} sx={{ my: 4, backgroundColor: "inherit", color: "black" }} fullWidth
                                variant="contained" startIcon={<GoogleIcon />} onClick={handleGoogleOAuthClick}>
                                Continue with Google
                            </Button>
                            <Typography sx={{ textAlign: 'center' }}>
                                Don&apos;t have an account?{' '}
                                <Link
                                    href="/signUp"
                                    variant="body2"
                                    sx={{ alignSelf: 'center' }}
                                >
                                    Sign up
                                </Link>
                            </Typography>
                        </Stack>
                    </Paper>
                </Box>
            </Modal>
        </>
    );
}