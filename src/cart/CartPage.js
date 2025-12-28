import { createContext, useContext, useEffect, useState } from "react";
import apiCall from "../HTTPRequest";
import { Box, Card, Divider, Paper, Skeleton, Typography } from "@mui/material";
import CartItemComponent from "./CartItemComponent";
import CartSummaryComponent from "./CartSummaryComponent";
import { ApplicationContext } from "../ApplicationContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {

  const [cartDetail, setCartDetail] = useState(null);
  const [cartLoading, setCartLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(null);
  const [subtotalAmount, setSubTotalAmount] = useState(null);
  const { setDisplayLoadingSpinner, primaryUserAddress, userAddress } = useContext(ApplicationContext);
  const [ selectedAddress, setSelectedAddress] = useState({});
  useEffect(() => {
    setSelectedAddress(primaryUserAddress);
  }, [primaryUserAddress]);
  const navigate = useNavigate();
  const handleOnClickPlaceOrder = async () => {
    setDisplayLoadingSpinner('block');
    const data = {
      cartId: cartDetail.cartId,
      languageId: 1,
      paymentTypeId: 1,
      ownerAddressId: selectedAddress?.addressId
    }
    const res = await apiCall('/order-service/order', 'POST', data);
    const jsonRes = JSON.parse(res);
    setDisplayLoadingSpinner('none');
    if (jsonRes.orderId) {
      navigate(`/order-confirmation`, { state: { orderDetails: jsonRes } });
    }
  }

  useEffect(() => {
    async function fetchcartDetails() {
      let data = await apiCall(`/cart-service/cart`);
      if (data) {
        let response = JSON.parse(data);
        setCartDetail(response);
        setCartLoading(false);
        setSubTotalAmount(response.subTotal);
        setTotalAmount(response.totalAmount);
      } else {
        setCartDetail(null);
        setCartLoading(false);
      }
    };
    fetchcartDetails();
  }, []);
  return (
    <Box display="flex" mx={{ xs: 1, sm: 6, md: 10 }} sx={{ justifyContent: "center" }}>
      <Box display="flex" alignItems={{ xs: "center", md: 'normal' }} pt={2} flexDirection={{ xs: "column", md: "row" }} sx={{ width: "clamp(30px, 90vw, 1300px)", justifyContent: "center" }}>
        <Box sx={{ width: { xs: "clamp(30px, 90vw, 1200px)", sm: "clamp(30px, 70vw, 1200px)", md: "clamp(30px, 60vw, 1000px)" } }}>
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
          }}><strong>Cart</strong></Typography>
          <Divider />
          {!cartLoading ?
            (cartDetail &&
              cartDetail.cartItems.map((cartItem, index) => {
                return <CartItemComponent key={index} cartDetailResponse={cartItem} languageCode="en" cartId={cartDetail.cartId} isQuantityEditDisabled={false} setSubTotalAmount={setSubTotalAmount} subtotalAmount={subtotalAmount} totalAmount={totalAmount} setTotalAmount={setTotalAmount} setCartDetail={setCartDetail} />
              }
              )
            )
            :
            (
              <Card sx={{ boxShadow: "0px 2px 2px -1px rgba(167, 250, 232, 1),0px 1px 2px 1px rgba(167, 250, 232, 1),1px 1px 3px 0px rgba(167, 250, 232, 0.5)", borderRadius: "5px !important", margin: "10px" }}><Skeleton variant="rectangular" height={200} /></Card>
            )
          }
          {(!cartDetail || cartDetail.cartItems?.length === 0) && <Box>No Item Present in Cart Continue shopping</Box>}
        </Box>
        {!cartLoading ?
          (
            <CartSummaryComponent cartDetail={cartDetail} handleOnClickPlaceOrder={handleOnClickPlaceOrder} subtotalAmount={subtotalAmount} totalAmount={totalAmount} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} userAddress={userAddress} />
          ) :
          (<Paper sx={{ border: "1px solid #e1e6e5ff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: { xs: "clamp(2.3rem, 40vw, 35rem)", md: "clamp(2.3rem, 20vw, 35rem)" }, marginTop: { xs: 2, md: 0 }, paddingRight: "25px", paddingLeft: "25px" }}><Skeleton variant="rectangular" height={400} /></Paper>)}
      </Box>
    </Box>
  )
}