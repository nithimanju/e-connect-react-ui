import { Box, Divider, Grid, Paper, Skeleton, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import apiCall from "../HTTPRequest";
import { ApplicationContext } from "../ApplicationContext";
import OrderListComponent from "./OrderListComponent";

export default function OrderListPage() {
  const { language } = useContext(ApplicationContext);
  const [orderList, setOrderList] = useState(null);
  const [isOrderLoading, setIsOrderLoading] = useState(true);
  const [orderListResponse, setOrderListResponse] = useState([]);
  const [orderFrom, setOrderFrom] = useState(0);
  const [totalMaxPages, setTotalMaxPages] = useState(0);

  const handleScroll = useCallback(() => {
    console.log('scrolled to bottom', window.innerHeight,
      document.documentElement.scrollTop,
      document.documentElement.offsetHeight - 1, orderFrom, totalMaxPages);
    if (
      window.innerHeight +
      document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1 && orderFrom <= totalMaxPages
    ) {
      setOrderFrom(orderFrom => orderFrom + 1);
    }
  }, [orderFrom, totalMaxPages]);
  useEffect(() => {
    console.log('scrolled to Use Callback');
    window.addEventListener('scroll', handleScroll);
    return () =>
      window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    async function fetchOrderList() {
      const data = {
        from: orderFrom,
        size: 10
      }
      console.log("Languag is inside fetch", language.languageId);
      let responseData = await apiCall(`/order-service/order-list?languageId=${language.languageId}`, 'POST', data);
      if (data) {
        setOrderList(JSON.parse(responseData));
        setOrderListResponse([...orderListResponse, ...JSON.parse(responseData).orderListResponses]);
        setTotalMaxPages(JSON.parse(responseData).count / 10 + 1);
      } else {
        setOrderList(null);
      }
      setIsOrderLoading(false);
    };
    fetchOrderList();
  }, [orderFrom]);

  return (
    <Box display="flex" mx={{ xs: 1, sm: 6, md: 10 }} sx={{ justifyContent: "center" }}>
      <Paper sx={{ boxShadow: "0px 2px 2px -1px rgba(167, 250, 232, 1),0px 1px 2px 1px rgba(167, 250, 232, 1),1px 1px 3px 0px rgba(167, 250, 232, 0.5)", borderRadius: "5px !important", margin: "10px", width: "clamp(30px, 90vw, 1200px)" }}>
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
        }}><strong>My Orders</strong></Typography>
        <Divider />
        <Box p={1}>
          <Grid container my={2} p={1}>
            <Grid size={3} justifyContent="center">
              <Typography textAlign="center">
                <strong>Order Number</strong>
              </Typography>
            </Grid>
            <Grid size={3} justifyContent="center">
              <Typography textAlign="center">
                <strong>Order Date</strong>
              </Typography>
            </Grid>
            <Grid size={3} justifyContent="center">
              <Typography textAlign="center">
                <strong>Total Amount</strong>
              </Typography>
            </Grid>
            <Grid size={3} justifyContent="center">
              <Typography textAlign="center">
                <strong>Status</strong>
              </Typography>
            </Grid>
          </Grid>
          {
            orderListResponse && orderListResponse.length > 0 ? (orderListResponse.map((orderItem, key) => {
              return <OrderListComponent key={key} orderItem={orderItem} />
            })) :
              (Array.from({ length: 8 }).map((_, i) => (
                <>
                  <Skeleton style={{ marginBottom: "4px" }} variant="rectangular" height={50} />
                  <Divider />
                </>
              )))
          }
        </Box >
      </Paper >
    </Box >
  );
}