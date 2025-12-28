import { Divider, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function OrderListComponent(props) {
  const orderItem = props.orderItem;
  const dateObject = new Date(orderItem.orderedDate);
  const yearUTC = dateObject.getUTCFullYear();
  const monthUTC = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0');
  const dayUTC = dateObject.getUTCDate().toString().padStart(2, '0');

  const formattedDate = `${yearUTC}-${monthUTC}-${dayUTC}`;
  return (
    <>
      <Divider />
      <Grid container my={2}>
        <Grid size={3} justifyContent="center">
          <Link to={`/order-detail?orderId=${orderItem.orderId}`}>
            <Typography textAlign="center">
              {orderItem.orderNumber}
            </Typography>
          </Link>
        </Grid>
        <Grid size={3} justifyContent="center">
          <Typography textAlign="center">
            {formattedDate}
          </Typography>
        </Grid>
        <Grid size={3} justifyContent="center">
          <Typography textAlign="center">
            {orderItem.totalPrice}
          </Typography>
        </Grid>
        <Grid size={3} justifyContent="center">
          <Typography textAlign="center">
            {orderItem.statusName}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}