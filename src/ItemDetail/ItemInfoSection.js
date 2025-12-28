import { Box, Button, Container, Divider, Rating, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import ItemMediaSection from './ItemMediaSection';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
export default function ItemInfoSection(props) {
  const itemDetail = props.itemDetail;
  const title = itemDetail.itemTitles?.['en'];
  const rating = itemDetail.rating;
  const price = itemDetail.price;
  const descriptions = itemDetail.itemDescriptions?.['en'];
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));
  console.log("Came to Item Info");
  return (
    <Box>
      <Typography variant="h5" fontWeight={600}>
        {title}
      </Typography>
      <Divider sx={{ backgroundColor: "#f7fedbff" }} size={1} orientation="horizontal" flexItem />
      <Box my={1}>
        <Rating sx={{ fontSize: "clamp(12px, 3vw, 20px)" }} name="half-rating" value={rating} precision={0.1} readOnly />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
        <Stack direction="row" spacing={0.1} sx={{ textAlign: 'center', justifyContent: 'center' }}>
          <CurrencyRupeeIcon sx={{ fontSize: "clamp(10px, 3vw, 15px)" }} />
          <Typography sx={{
            fontSize: "clamp(1rem, 3vw, 2rem)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }} variant="h5"><strong>{price}</strong></Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ marginLeft: 1, textAlign: 'center', justifyContent: 'center' }}>
          <Typography sx={{
            fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }} variant="subtitle2">MRP</Typography>
          <Typography sx={{
            fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}>({itemDetail.discountPercentage}%off)</Typography>
        </Stack>
      </Box>
      {isMobileOrTablet && (
        <>
          <Box sx={{ my: 2 }}>
            <ItemMediaSection mediaPaths={itemDetail.medias} />
          </Box>
          <Container sx={{ my: 2, display: "flex", justifyContent: "center", alignContent: "center" }}>
            <Button variant="contained" sx={{ mt: 2, py: 1.5 }}>
              Add to cart
            </Button>
            <Button variant="contained" color="warning" sx={{ mt: 2, py: 1.5 }}>
              Buy Now
            </Button>
          </Container>
        </>
      )}
      {descriptions.map((element, index) => {
        return (
          <Box
            key={index}
            dangerouslySetInnerHTML={{ __html: element }}
          />
        );
      })}
    </Box>
  );
}