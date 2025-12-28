import { Box, Divider, Paper, Skeleton, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import OrderSummaryComponent from "./OrderSummaryComponent";


export default function OrderConfirmationPage() {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;
  const orderId = orderDetails.orderId;
  const orderUrl = `/order-detail?orderId=${orderId}`;
  const orderNumber = orderDetails.orderNumber;
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
          <Typography>
            Order has been successfully place, Order Number is: {orderNumber}
          </Typography>
          <Typography>
            For viewing Order summary please  <Link to={orderUrl}>click here</Link>
          </Typography>
        </Box>
        {orderDetails ?
          (<OrderSummaryComponent orderDetails={orderDetails} />) :
          (<Paper sx={{ border: "1px solid #e1e6e5ff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: { xs: "clamp(2.3rem, 40vw, 35rem)", md: "clamp(2.3rem, 20vw, 35rem)" }, marginTop: { xs: 2, md: 0 }, paddingRight: "25px", paddingLeft: "25px" }}><Skeleton variant="rectangular" height={400} /></Paper>)}
      </Box>
    </Box>
  );
}