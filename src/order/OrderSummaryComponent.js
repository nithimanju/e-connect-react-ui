import { Divider, Grid, Paper, Typography } from "@mui/material";
import CartSummaryPriceComponent from "../components/CartSummaryPriceComponent";

export default function OrderSummaryComponent(props) {
    const orderDetails = props.orderDetails;
    return (
    <Paper sx={{ marginBottom: "10px", borderBottomLeftRadius: { xs: "0px", md: "4.3vw" }, borderTopLeftRadius: { xs: "3vw", md: "0.5vw" }, borderTopRightRadius: { xs: "3vw", md: "0px" }, border: "1px solid #e1e6e5ff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: { xs: "clamp(2.3rem, 40vw, 35rem)", md: "clamp(2.3rem, 20vw, 35rem)" }, marginTop: { xs: 2, md: 0 }, paddingRight: "25px", paddingLeft: "25px" }}>
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
            }} variant="subtitle2"><strong>Order Summary</strong>
            </Typography>
            <Divider sx={{ backgroundColor: "#f7f7f7ff" }} size={0.5} orientation="horizontal" flexItem />
            <Grid container sx={{ width: "inherit", marginTop: 2 }}>
                <CartSummaryPriceComponent title="Sub Total :" price={orderDetails?.subTotal} />
                <CartSummaryPriceComponent title="Freight :" price={orderDetails?.totalFreightAmount} />
                <CartSummaryPriceComponent title="Tax :" price={orderDetails?.totalTaxAmount} />
                <CartSummaryPriceComponent title="Discount :" price={orderDetails?.totalDiscountPrice} />
            </Grid>
            <Divider sx={{ backgroundColor: "#f7f7f7ff" }} size={0.5} orientation="horizontal" flexItem />
            <Grid my={2} container sx={{ width: "inherit" }}>
                    <CartSummaryPriceComponent title="Total :" price={orderDetails?.totalPaidAmount} />
            </Grid>
            {/* <Divider sx={{ backgroundColor: "#f7f7f7ff" }} size={0.5} orientation="horizontal" flexItem />
            <Button onClick={() => handleOnClickPlaceOrder()} sx={{border:"1px solid #929090ff", borderRadius: 5, my: 2, backgroundColor: "#6fff44ff"}}>
                <Typography sx={{
                    fontSize: "clamp(0.03rem, 1.3vw, 1.0rem)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "#474e45ff"
                }} variant="subtitle1"><strong>Re Order</strong></Typography>
            </Button> */}
        </Paper>
    );
}