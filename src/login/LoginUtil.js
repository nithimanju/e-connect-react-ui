import { useCallback, useContext, useEffect, useState } from "react";
import apiCall from "../HTTPRequest";
import { Avatar, Button, Typography } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import LogInComponent from "./LogInComponent";
import { deepOrange } from '@mui/material/colors';
import { ApplicationContext } from "../ApplicationContext";
import { Link } from "react-router-dom";

export default function HeaderLoginProfile() {
  const [loginVisibilityStatus, setLoginVisibilityStatus] = useState(false);
  const setLoginVisibility = useCallback((boolValue) => {
    setLoginVisibilityStatus(boolValue);
  }, []);
  const {isLoggedIn, setIsloggedIn} = useContext(ApplicationContext);

  useEffect(() => {
    async function checkLoggedIn() {
      const loggedInStatus = await apiCall("/user-service/is-loggedin");
      if (loggedInStatus) {
        setIsloggedIn(true);
      } else {
        setIsloggedIn(false);
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <Link to="user-profile">
        <Button>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
        </Button>
        </Link>
      ) : (<>
        <Button color="inherit" onClick={() => setLoginVisibility(true)}>
          <LoginIcon className='header-compl-color' sx={{ fontSize: 20 }} />
          <Typography className='header-text' variant="subtitle2" sx={{ fontSize: { xs: 0, md: 10 }, marginTop: 0.5 }}><strong>Login/SignUp</strong>
          </Typography>
        </Button>
        <LogInComponent loginVisibilityStatus={loginVisibilityStatus} setLoginVisibility={setLoginVisibility} />
      </>)}
    </>
  );
}