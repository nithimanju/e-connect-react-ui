import { useSearchParams } from "react-router-dom";
import CartItemComponent from "../cart/CartItemComponent";
import OrderSummaryComponent from "./OrderSummaryComponent";
import { useContext, useEffect, useState } from "react";
import { Box, Card, Divider, Paper, Skeleton, Typography } from "@mui/material";
import { ApplicationContext } from "../ApplicationContext";
import apiCall from "../HTTPRequest";

export default function OrderDetailPage() {
  const { language } = useContext(ApplicationContext);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isOrderLoading, setIsOrderLoading] = useState(true);
  const [searchParameters] = useSearchParams();
  console.log("Languag is ",language.languageId);
  const orderId = searchParameters.get('orderId');
  useEffect(() => {
    async function fetchOrderDetails() {
      console.log("Languag is inside fetch",language.languageId);
      let data = await apiCall(`/order-service/order?languageId=${language.languageId}&orderId=${orderId}`);
      if (data) {
        setOrderDetails(JSON.parse(data));
        setIsOrderLoading(false);
      } else {
        setOrderDetails(null);
        setIsOrderLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId, language]);
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
          }}><strong>Order Details: {orderDetails?.orderNumber}</strong></Typography>
          <Divider />
          {!isOrderLoading ?
            (orderDetails &&
              orderDetails.cartItemDetailResponses.map((cartItem, index) => {
                return <CartItemComponent key={index} cartDetailResponse={cartItem} languageCode="en" cartId={cartItem.cartId} isQuantityEditDisabled={true}/>
              }
              )
            )
            :
            (
              <Card sx={{ boxShadow: "0px 2px 2px -1px rgba(167, 250, 232, 1),0px 1px 2px 1px rgba(167, 250, 232, 1),1px 1px 3px 0px rgba(167, 250, 232, 0.5)", borderRadius: "5px !important", margin: "10px" }}><Skeleton variant="rectangular" height={200} /></Card>
            )
          }
        </Box>
        {!isOrderLoading ?
          (orderDetails && <OrderSummaryComponent orderDetails={orderDetails} />) :
          (<Paper sx={{ border: "1px solid #e1e6e5ff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: { xs: "clamp(2.3rem, 40vw, 35rem)", md: "clamp(2.3rem, 20vw, 35rem)" }, marginTop: { xs: 2, md: 0 }, paddingRight: "25px", paddingLeft: "25px" }}><Skeleton variant="rectangular" height={400} /></Paper>)}
      </Box>
    </Box>
  );
}