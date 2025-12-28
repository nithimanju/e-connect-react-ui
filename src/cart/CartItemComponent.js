import { Box, Card, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CurrencyRupee } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import apiCall from "../HTTPRequest";

export default function CartItemComponent(props) {
  const isQuantityEditDisabled = props.isQuantityEditDisabled;
  const [cartDetailResponse, setCartDetailResponse] = useState(props.cartDetailResponse);
  const languageCode = props.languageCode;
  const itemDetailResponse = cartDetailResponse.itemDetailResponse;
  const itemId = itemDetailResponse.itemId;
  const itemTitle = itemDetailResponse.itemTitles[languageCode];
  const mediaPath = itemDetailResponse.medias[0].mediaPath;
  const price = cartDetailResponse.sellingPrice
  const [totalPrice, setTotalPrice] = useState(cartDetailResponse.totalPrice);
  const discount = itemDetailResponse.discountPercentage;
  const [quantity, setQuantity] = useState(cartDetailResponse.quantity);
  const totalAmount = props.totalAmount;
  const subtotalAmount = props.subtotalAmount;
  const setTotalAmount = props.setTotalAmount;
  const setSubTotalAmount = props.setSubTotalAmount;
  const setCartDetail = props.setCartDetail;
  const cartId = props.cartId;
  var qnty = quantity;

  const handleInput = useCallback((value) => {
    let changedQnty = Number(value.target.value);
    if (changedQnty || changedQnty === 0) {
      setQuantity(changedQnty);
      setTotalPrice(price * changedQnty);
    }
  }, [quantity]);

  const updateCartItemValue = useCallback(async (value) => {
    let changedQnty = Number(value.target.value);
    if (changedQnty && changedQnty !== cartDetailResponse.quantity) {
      const requestData = {
        itemId: itemId,
        quantity: changedQnty,
        cartId: cartId,
        cartItemId: null
      }
      const data = await apiCall("/cart-service/cartItem", "PUT", requestData);
      if (data && JSON.parse(data).quantity === changedQnty) {
        let updatedCartItemResponse = JSON.parse(data);
        let updatedPrice = Number(price * changedQnty) - Number(cartDetailResponse.totalPrice);
        setSubTotalAmount(Number(subtotalAmount) + updatedPrice);
        setTotalAmount(Number(totalAmount) + updatedPrice);
        setCartDetailResponse(updatedCartItemResponse);
      }
    }
  })

  const handleDeleteItem = useCallback(async (value) => {
    const requestData = {
      itemId: itemId,
      cartId: cartId,
      cartItemId: null
    }
    const data = await apiCall("/cart-service/cartItem", "DELETE", requestData);
    if (data) {
      let oldTotalPrice = Number(cartDetailResponse.totalPrice);
      let responseCartDetails = JSON.parse(data);
      setSubTotalAmount(Number(subtotalAmount) - oldTotalPrice);
      setTotalAmount(Number(totalAmount) - oldTotalPrice);
      setCartDetail(responseCartDetails);
    }
  });

  let navigate = useNavigate();
  const handleItemClick = () => {
    navigate(`/item-detail?itemId=${itemId}`);
  }

  return (
    <Card sx={{ boxShadow: "0px 2px 2px -1px rgba(167, 250, 232, 1),0px 1px 2px 1px rgba(167, 250, 232, 1),1px 1px 3px 0px rgba(167, 250, 232, 0.5)", borderRadius: "5px !important", margin: "10px" }}>
      <Stack direction="row" spacing={1} sx={{ height: "150px", minHeight: "50px", maxHeight: "100%", alignItems: "center", justifyContent: "center" }}>
        <Box size={2} sx={{ height: "inherit", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, width: "clamp(30px, 30vw, 205px)", marginRight: "2px !important", marginLeft: "2px !important" }}>
          <img id={itemId} src={mediaPath} onClick={() => handleItemClick()} style={{ objectFit: "contain", maxHeight: "100%", minHeight: "0px", minWidth: "0px", width: "100%", maxWidth: "100%" }} />
        </Box>
        <Stack sx={{ width: "clamp(2.3rem, 40vw, 35rem)", marginRight: "2px !important", marginLeft: "2px !important" }}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", padding: 2 }}>
            <Typography sx={{
              fontSize: "clamp(0.03rem, 1.5vw, 1.0rem)",
              flexWrap: "wrap",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              textOverflow: "ellipsis",
              fontFamily: "Amazon Ember, Arial, sans-serif",
              marginBottom: 2
            }}><strong>{itemTitle}</strong></Typography>
            <Stack direction="row" spacing={0.1} sx={{ textAlign: 'center', justifyContent: 'center' }}>
              <CurrencyRupee sx={{ fontSize: "clamp(10px, 3vw, 15px)" }} />
              <Typography sx={{
                fontSize: "clamp(0.6rem, 3vw, 1.5rem)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }} variant="h5"><strong>{price}</strong></Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ marginLeft: 1, textAlign: 'center', justifyContent: 'center' }}>
              <Typography sx={{
                fontSize: "clamp(0.3rem, 1.5vw, 0.9rem)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }} variant="subtitle2">MRP</Typography>
              <Typography sx={{
                fontSize: "clamp(0.3rem, 1.5vw, 0.9rem)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}>({itemDetailResponse.discountPercentage}%off)</Typography>
            </Stack>
          </Box>
        </Stack>
        <Box mx={2} sx={{ display: { xs: "none", md: "flex" }, width: "clamp(0.7rem, 3vw, 2rem)", justifyContent: "center", alignItems: "center", marginRight: "2px !important", marginLeft: "2px !important" }}>
          <input id="quntInput" type="text" defaultValue={qnty}
            disabled={isQuantityEditDisabled}
            typeof="number"
            min="0"
            onBlur={updateCartItemValue}
            onChange={handleInput} style={{
              width: "clamp(10px, 2vw, 25px)",
              height: "max-content",
              padding: "10px",
              textAlign: "center"
            }} />
        </Box>
        <Stack sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", width: "clamp(50px, 25vw, 200px)", marginRight: "2px !important", marginLeft: "2px !important", height: "inherit" }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "55%" }}>
            <Typography sx={{
              fontSize: "clamp(0.03rem, 1.5vw, 1.0rem)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }} variant="subtitle1">Total</Typography>
            <Stack direction="row" spacing={0.1} sx={{ textAlign: 'center', justifyContent: 'center' }}>
              <CurrencyRupee sx={{ fontSize: "clamp(10px, 3vw, 15px)" }} />
              <Typography sx={{
                fontSize: "clamp(10px, 3vw, 25px)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }} variant="h5">{totalPrice}</Typography>
            </Stack>
          </Box>

          <Stack direction="row" spacing={0.1} sx={{ textAlign: 'center', justifyContent: 'space-evenly', width: "inherit" }}>
            <Box mx={2} sx={{ display: { xs: "flex", md: "none" }, width: "clamp(0.7rem, 3vw, 2rem)", justifyContent: "center", alignItems: "center" }}>
              <input type="text" defaultValue={qnty}
                disabled={isQuantityEditDisabled}
                onChange={handleInput} style={{
                  width: "clamp(10px, 2vw, 25px)",
                  height: "max-content",
                  padding: "5px",
                  textAlign: "center",
                  border: "1px gold solid"
                }} />
            </Box>
            <button onClick={() => handleDeleteItem()} style={{ border: "0px", background: "inherit", width: "clamp(5px, 3vw, 20px)", padding: { xs: "0px", sm: "0px", md: "8px" } }}>
              <DeleteIcon sx={{ color: "#F77793", fontSize: { xs: 14, sm: 16, md: 22 } }} />
            </button>
            <button style={{ border: "0px", background: "inherit", width: "clamp(5px, 3vw, 20px)", padding: { xs: "0px", sm: "0px", md: "8px" } }}>
              <FavoriteIcon sx={{ color: '#F77793', fontSize: { xs: 14, sm: 16, md: 22 } }} />
            </button>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}