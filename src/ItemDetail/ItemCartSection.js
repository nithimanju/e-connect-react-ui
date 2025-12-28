import { Button, Paper, Typography } from "@mui/material";
import { useContext } from "react";
import { ApplicationContext } from "../ApplicationContext";
import apiCall from "../HTTPRequest";

export default function ItemCartSection(props) {
  const price = props.price;
  const itemId = props.itemId;
  const { cartId, setDisplayLoadingSpinner, setDisplayAlterMessage, setIsDisplayAlterMessage } = useContext(ApplicationContext);

  const handleOnClickItemToCart = async () => {
    setDisplayLoadingSpinner('block');
    const data = {
      cartId: cartId,
      quantity: 1,
      itemId: Number(itemId)
    };
    let responseData = await apiCall(`/cart-service/cartItem`, 'POST', data);
    setDisplayLoadingSpinner('none');
    if (responseData) {
      setDisplayAlterMessage('Item Added to Cart successfully');
      setIsDisplayAlterMessage(true);
    }
  }

  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight={600}>
        ₹{price}
      </Typography>
      <Typography color="green">In stock</Typography>
      <Button onClick={() => handleOnClickItemToCart()} fullWidth variant="contained" sx={{ mt: 2, py: 1.5 }}>
        Add to cart
      </Button>
      <Button fullWidth variant="contained" color="warning" sx={{ mt: 1, py: 1.5 }}>
        Buy Now
      </Button>
    </Paper>
  );
}