import { Box, Divider, Grid, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import ItemMediaSection from './ItemMediaSection';
import ItemInfoSection from './ItemInfoSection';
import ItemCartSection from './ItemCartSection';
import apiCall from '../HTTPRequest.js';
import { useEffect, useState } from "react";

export default function ItemDetailPage(props) {
    const [itemDetailParam] = useSearchParams();
    const itemId = itemDetailParam.get("itemId");
    const [queryItemId, setQueryItemId] = useState(itemId);
    const [itemDetails, setItemDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getItemDetails() {
            let data = await apiCall(`/part-service/part-detail/${queryItemId}`)
            setItemDetails(JSON.parse(data));
            if(data) {
            setLoading(false);
            }
        };
        getItemDetails();
    }, []);
    return (
        <Box display="flex" flexDirection="column" mx={{ xs: 1, sm: 6, md: 10 }} sx={{justifyContent:"center"}}>
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
                    }}><strong>Item Detail</strong></Typography>
                    <Divider />
            {!loading ? (
                <Grid container spacing={2}>
                    <Grid sx={{ display: { xs: 'none', md: 'block' } }} order={{ xs: 1, sm: 1, md: 0 }} size={{ xs: 12, md: 4 }}>
                        <ItemMediaSection mediaPaths={itemDetails.medias} />
                    </Grid>
                    <Grid order={{ xs: 0, sm: 0, md: 1 }} size={{ xs: 12, md: 5 }}>
                        <ItemInfoSection itemDetail={itemDetails} />
                    </Grid>
                    <Grid sx={{ display: { xs: 'none', md: 'block' } }} order={2} size={{ xs: 12, md: 3 }}>
                        <ItemCartSection price={itemDetails.price} itemId={itemId} />
                    </Grid>
                </Grid>
            ) : (
                <div>Loading</div>
            )}
        </Box>
    );
}