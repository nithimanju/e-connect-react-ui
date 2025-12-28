

import { createContext, useState } from 'react';
import Header from './header/Header';
import ItemDetailPage from './ItemDetail/ItemDetailPage';
import App from './App';
const ApplicationContext = createContext();
const ApplicationContextProvider = ({ children }) => {

    const [cartId, setCartId] = useState(0);
    const [language, setLanguage] = useState({});
    const [displayLoadingSpinner, setDisplayLoadingSpinner] = useState('none');
    const [isDisplayAlterMessage, setIsDisplayAlterMessage] = useState(false);
    const [displayAlterMessage, setDisplayAlterMessage] = useState('');
    const [isLoggedIn, setIsloggedIn] = useState(false);
    const [primaryUserAddress, setPrimaryUserAddress] = useState({});
    const [userAddress, setUserAddress] = useState({});
    return (
        <ApplicationContext.Provider value={{ cartId, setCartId, language, setLanguage, displayLoadingSpinner, setDisplayLoadingSpinner, isDisplayAlterMessage, setIsDisplayAlterMessage, displayAlterMessage, setDisplayAlterMessage, isLoggedIn, setIsloggedIn, primaryUserAddress, setPrimaryUserAddress, userAddress, setUserAddress }}>
            { children }
        </ApplicationContext.Provider>
    );
}


export { ApplicationContext, ApplicationContextProvider };