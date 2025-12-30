import { Box, Paper, Typography, Stack } from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Rating from '@mui/material/Rating';
import { Link } from "react-router-dom";

export default function SearchedItem(props) {
    const itemDetail = props.itemDetail;
    const itemTitle = itemDetail.itemTitle;
    const itemMediaPath = itemDetail.mediaPaths ? itemDetail.mediaPaths : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuv7GqevqRqUgCNaskcs87rvMxqN-jENlxNQ&s";
    const itemPrice = itemDetail.price;
    const itemRating = itemDetail.rating;
    const itemDisc = itemDetail.discountPercentage;
    const itemId = itemDetail.itemId;

    return (
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/item-detail?itemId=${itemId}`}>
            <Paper elevation={3} sx={{ textAlign: 'center', minWidth: 0, width: "100%", paddingRight: 0.5, paddingLeft: 0.5, paddingBottom: 2 }}>
                <Box>
                    <img src={itemMediaPath} style={{ objectFit: "contain", minHeight: "80px", height: "20vw", maxHeight: "270px", minWidth: "0px", maxWidth: "100%" }}></img>
                </Box>
                <Stack direction="row" spacing={0.1} sx={{ textAlign: 'center', justifyContent: 'center' }}>
                    <CurrencyRupeeIcon sx={{ fontSize: "clamp(10px, 3vw, 15px)" }} />
                    <Typography sx={{
                        fontSize: "clamp(1rem, 3vw, 2rem)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }} variant="h5"><strong>{itemPrice}</strong></Typography>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ textAlign: 'center', justifyContent: 'center' }}>
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
                    }}>({itemDisc}%off)</Typography>
                </Stack>
                <Box sx={{ textAlign: 'center' }}>
                    <Rating sx={{ fontSize: "clamp(12px, 3vw, 20px)" }} name="half-rating" value={itemRating} precision={0.1} readOnly />
                </Box>
                <Typography
                    variant="subtitle2"
                    sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
                    }}
                >
                    {itemTitle}
                </Typography>
            </Paper>
        </Link>
    );
}