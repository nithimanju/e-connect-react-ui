import { Box, Button, Typography } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function PrimaryAddress(props) {
    const { primaryUserAddress, setIsAddressModalOpen } = props;
    return (
        <Button onClick={() => setIsAddressModalOpen(true)} sx={{ textTransform: 'none' }}>
            <Box display={"flex"} flexDirection={"row"}>
                <LocationOnIcon sx={{ color: '#F77793', fontSize: 20 }} />
                <Typography variant="subtitle2" sx={{ fontSize: { xs: 0, md: 10 }, marginTop: 0.5, color: 'black' }}>
                    <strong>
                        {primaryUserAddress.addressName}, {primaryUserAddress.city}, {primaryUserAddress.state}
                    </strong>
                </Typography>
            </Box>
        </Button>
    );
}