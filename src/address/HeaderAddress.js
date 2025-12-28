import { useContext, useEffect, useState } from "react";
import apiCall from "../HTTPRequest";
import { ApplicationContext } from "../ApplicationContext";
import PrimaryAddress from "./PrimaryAddress";
import AddressSelectorModal from "./AddressSelectorModal";

export default function HeaderAddress(props) {

    const { primaryUserAddress, setPrimaryUserAddress, userAddress, setUserAddress } = useContext(ApplicationContext);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

    const handlePrimaryAddressChange = (event) => {
        if (event.target.value) {
            apiCall("/user-service/update-primary-address?addressId=" + event.target.value, "PUT", {}).then((data) => {
                if (data) {
                    const updatedAddress = JSON.parse(data);
                    const primaryAddress = updatedAddress.find(addr => addr.isPrimary) || updatedAddress[0];
                    setPrimaryUserAddress(primaryAddress);
                }
            }).catch((error) => {
                console.error("Error fetching user address:", error);
            });
        }
    }

    useEffect(() => {
        async function fetchUserAddress() {
            apiCall("/user-service/user-address", "GET").then((data) => {
                if (data) {
                    const addresses = JSON.parse(data);
                    const primaryAddress = addresses.find(addr => addr.isPrimary) || addresses[0];
                    setUserAddress(addresses);
                    setPrimaryUserAddress(primaryAddress);
                }
            }).catch((error) => {
                console.error("Error fetching user address:", error);
            });
        }
        fetchUserAddress();
    }, []);
    return (
        <>
            {primaryUserAddress && (
                <PrimaryAddress primaryUserAddress={primaryUserAddress} setIsAddressModalOpen={setIsAddressModalOpen} />
            )}
            <AddressSelectorModal isAddressModalOpen={isAddressModalOpen} setIsAddressModalOpen={setIsAddressModalOpen} userAddress={userAddress} primaryUserAddress={primaryUserAddress} handlePrimaryAddressChange={handlePrimaryAddressChange} />
        </>
    );
}