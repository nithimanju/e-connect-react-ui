import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import CartSummaryPriceComponent from "../components/CartSummaryPriceComponent";
import { useState } from "react";
import PrimaryAddress from "../address/PrimaryAddress";
import AddressSelectorModal from "../address/AddressSelectorModal";

export default function CartSummaryComponent(props) {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const { cartDetail, handleOnClickPlaceOrder, subtotalAmount, totalAmount, selectedAddress, setSelectedAddress, userAddress } = props;
  
      const handleSelectedAddressChange = (event) => {
          if (event.target.value) {
              const address = userAddress.find(addr => addr.addressId === Number(event.target.value));
              if(address){
                setSelectedAddress(address);
              }
          }
      }

  return (
    <>
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
      }} variant="subtitle2"><strong>Cart Summary</strong>
      </Typography>
      <Divider sx={{ backgroundColor: "#f7f7f7ff" }} size={0.5} orientation="horizontal" flexItem />
      <Grid container sx={{ width: "inherit", marginTop: 2 }}>
        <CartSummaryPriceComponent title="Sub Total :" price={subtotalAmount} />
        <CartSummaryPriceComponent title="Discount :" price={cartDetail?.totalDiscountPrice} />
      </Grid>
      <Divider sx={{ backgroundColor: "#f7f7f7ff" }} size={0.5} orientation="horizontal" flexItem />
      <Grid my={2} container sx={{ width: "inherit" }}>
        <CartSummaryPriceComponent title="Total :" price={totalAmount} />
      </Grid>
      <Divider sx={{ backgroundColor: "#f7f7f7ff" }} size={0.5} orientation="horizontal" flexItem />
      <Typography sx={{
        fontSize: "clamp(0.4rem, 1.2vw, 0.9rem)"}}>Deliver To:</Typography>
      {selectedAddress && (
        <PrimaryAddress primaryUserAddress={selectedAddress} setIsAddressModalOpen={setIsAddressModalOpen} />
      )}
      <Divider sx={{ backgroundColor: "#f7f7f7ff" }} size={0.5} orientation="horizontal" flexItem />
      <Button onClick={() => handleOnClickPlaceOrder()} sx={{ border: "1px solid #929090ff", borderRadius: 5, my: 2, backgroundColor: "#6fff44ff" }}>
        <Typography sx={{
          fontSize: "clamp(0.03rem, 1.3vw, 1.0rem)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "#474e45ff"
        }} variant="subtitle1"><strong>Place Order</strong></Typography>
      </Button>
    </Paper>
    <AddressSelectorModal isAddressModalOpen={isAddressModalOpen} setIsAddressModalOpen={setIsAddressModalOpen} userAddress={userAddress} primaryUserAddress={selectedAddress} handlePrimaryAddressChange={handleSelectedAddressChange} />
    </>
  );
}