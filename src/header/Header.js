import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Typography from '@mui/material/Typography';
import SearchSuggestionTemplate from '../search/SearchSuggestionTemplate';
import Badge from '@mui/material/Badge';
import { useState, useCallback, useEffect, useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText'
import { Link, useNavigate } from "react-router";
import './Header.css';
import HeaderLoginProfile from '../login/LoginUtil';
import apiCall from '../HTTPRequest';
import { ApplicationContext } from "../ApplicationContext.js";
import HeaderAddress from '../address/HeaderAddress.js';

export default function Header() {

  const [openOptionDrawer, setOpenOptionDrawer] = useState(false);
  const [loginVisibilityStatus, setLoginVisibilityStatus] = useState(false);
  const [cartDetail, setCartDetail] = useState({});
  const [cartItemCount, setCartItemCount] = useState(0);
  const [menuItems, setMenuItems] = useState([]);

  const navigate = useNavigate();
  const { setCartId, setDisplayLoadingSpinner, setDisplayAlterMessage, setIsDisplayAlterMessage, isLoggedIn, setIsloggedIn } = useContext(ApplicationContext);
  const handleOnClickTooggleOptionDrawer = useCallback((boolValue) => {
    setOpenOptionDrawer(boolValue);
  }, []);
  const setLoginVisibility = useCallback((boolValue) => {
    setLoginVisibilityStatus(boolValue);
  }, []);
  const handleLogOut = async () => {
    setDisplayLoadingSpinner('block');
    const res = await apiCall('user-service/log-out', 'POST');
    setDisplayLoadingSpinner('none');
    if (res === "Logged out successfully") {
      setIsloggedIn(false);
      setDisplayAlterMessage('Log Out successfull');
      setIsDisplayAlterMessage(true);
      navigate("/");
    }
  }
  useEffect(() => {
    async function fetchcartDetails() {
      let data = await apiCall(`/cart-service/cart`);
      if (data) {
        const responseData = JSON.parse(data);
        setCartDetail(responseData);
        setCartItemCount(responseData.cartItems ? responseData.cartItems.length : 0);
        setCartId(responseData.cartId);
      } else {
        setCartDetail(null);
      }
    };
    fetchcartDetails();
  }, [])

  useEffect(() => {
    async function fetchMenuItems() {
      let data = await apiCall(`/user-service/get?languageId=1`);
      if (data) {
        const responseData = JSON.parse(data);
        setMenuItems(responseData);
      } else {
        setMenuItems([]);
      }
    };
    fetchMenuItems();
  }, [isLoggedIn]);

  return (
    <>
      <AppBar className='header-background-color' position="static" sx={{
        backgroundColor: "#a7fae8",
        flexGrow: 1
      }}>
        <Toolbar sx={{
          paddingLeft: 0,
          paddingRight: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly'
        }}>
          <Link to="/">
            <Box
              component="img"
              alt="Company Logo"
              src="/Gemini_Generated_Image_ruu1h2ruu1h2ruu1-removebg-preview.png"
              sx={{
                height: { xs: "40px", sm: "50px", md: "60px" },
                width: { xs: "70px", sm: "100px", md: "130px" },
                display: "block"
              }}
            />
          </Link>
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 0, width: { xs: "5vw", md: "1vw" } }} mx={1}>
            <Toolbar style={{
              paddingLeft: "0px !important",
              paddingRight: "0px !important"
            }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => handleOnClickTooggleOptionDrawer(true)}
              >
                <MenuIcon className='header-compl-color' sx={{ fontSize: 20 }} />
              </IconButton>
            </Toolbar>
          </Box>
          <Box sx={{ width: "clamp(1.5rem, 10vw, 22rem)", display: { xs: "none", md: "block" } }} mx={1}>
            <HeaderAddress />
          </Box>
          <Box sx={{ width: "clamp(1.5rem, 35vw, 62rem)", display: { xs: "none", md: "block" } }} mx={1} mb={{ md: "inherit" }}>
            <SearchSuggestionTemplate autoCompleteId="inputMedium" />
          </Box>
          <Box mx={{ xs: 0, md: 1 }} sx={{ display: 'flex', justifyContent: 'center', width: { xs: "7vw", md: "clamp(1.5rem, 10vw, 3rem)" } }}>
            <Button sx={{ color: "inherit", display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: { xs: 0, md: 1 } }}>
              <FavoriteIcon sx={{ color: '#F77793', fontSize: 20 }} />
              <Typography className='header-text' variant="subtitle2" sx={{ fontSize: { xs: 0, md: 10 }, marginTop: 0.5 }}><strong>Favorites</strong>
              </Typography>
            </Button>
          </Box>
          <Box mx={{ xs: 0, md: 1 }} sx={{ display: 'flex', justifyContent: 'center', width: { xs: "7vw", md: "clamp(1.5rem, 10vw, 3rem)" } }}>
            <Link to="/cart">
              <Button sx={{ color: "inherit" }}>
                <Badge
                  badgeContent={cartItemCount}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#F7DB77",
                      border: "2px solid #DB77F7",
                      color: "#303230ff"
                    }
                  }}
                >
                  <ShoppingCartIcon sx={{ color: "#F77793", fontSize: 20 }} />
                </Badge>
              </Button></Link>
          </Box>
          <Box>
            <Link to="/my-orders">
              <Button sx={{ width: { xs: "7vw", md: 100 } }} color="inherit">
                <Typography className='header-text' variant="h5" sx={{ fontSize: { xs: 8, md: 10 } }}><strong>My Orders</strong>
                </Typography>
              </Button>
            </Link>
          </Box>
          <Box mx={{ xs: 0, md: 1 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: { xs: "7vw", md: "clamp(1.5rem, 10vw, 3rem)" }, flexDirection: 'column' }}>
            <HeaderLoginProfile />
          </Box>
        </Toolbar>
        <Box sx={{ width: "100%", display: { xs: "flex", md: "none" }, alignItems: 'center', justifyContent: 'center' }} m={1}>
          <Box width="60vw">
            <SearchSuggestionTemplate autoCompleteId="inputSmall" />
          </Box>
        </Box>
      </AppBar>
      <Drawer open={openOptionDrawer} onClose={() => handleOnClickTooggleOptionDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => handleOnClickTooggleOptionDrawer(false)}>
          <List>
            <Typography mx={2} variant="h3" sx={{ fontSize: { xs: 20, md: 25 }, marginTop: 0.5 }}>Hello Users!
            </Typography>
            {menuItems && menuItems.length > 0 && menuItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => navigate(item.menuPath)}>
                  <ListItemText primary={item.menuName} />
                </ListItemButton>
              </ListItem>
            ))}
            </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleLogOut()}>
                Log-Out
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}