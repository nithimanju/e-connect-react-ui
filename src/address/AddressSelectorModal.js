import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, FormControl, FormControlLabel, Modal, Radio, RadioGroup, Typography } from "@mui/material";

export default function AddressSelectorModal(props) {
    const { isAddressModalOpen, setIsAddressModalOpen, userAddress, primaryUserAddress, handlePrimaryAddressChange } = props;
    return (
        <Modal open={isAddressModalOpen}
            onClose={() => setIsAddressModalOpen(false)}
            BackdropProps={{
                sx: {
                    backgroundColor: "transparent",
                    backdropFilter: "blur(2px)",
                }
            }}>
            <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                outline: "none",
                backgroundColor: "#fdfcf6ff",
                border: "0px",
                borderRadius: 2
            }} >
                <Typography variant="h6" sx={{ color: 'black', margin: 2, textAlign: 'center' }}>
                    Select Delivery Address
                </Typography>
                <Box component="form" sx={{ width: '100%' }}>
                    {userAddress.length > 0 ? (
                        <FormControl sx={{ display: "flex", flexDirection: "row" }}>
                            <RadioGroup name="controlled-radio-buttons-group"
                                value={primaryUserAddress.addressId}
                                onChange={handlePrimaryAddressChange}>
                                {userAddress.map((address) => (
                                    <Box key={address.addressId} sx={{ padding: 2, borderBottom: '1px solid #ccc' }}>
                                        <FormControlLabel value={address.addressId} control={<Radio />} label={<Typography pl={1} variant="body1">
                                            {address.addressName}, {address.city}, {address.state}
                                        </Typography>} />
                                    </Box>
                                ))}
                            </RadioGroup>
                        </FormControl>)
                        : (
                            <Typography variant="body1">No addresses found.</Typography>
                        )}
                </Box>
            </Box>
        </Modal>
    );
}