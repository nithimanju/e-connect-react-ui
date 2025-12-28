import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import BannerCarousel from './BannerCarousel';
import SearchResult from './search/SearchResult';
import CategoryDetail from './category/CategoryDetail';
import { BrowserRouter, Route, Routes } from "react-router";
import ItemDetailPage from './ItemDetail/ItemDetailPage';
import CartPage from './cart/CartPage';
import LogInComponent from './login/LogInComponent';
import {ApplicationContextProvider} from './ApplicationContext';
import { CircularProgress } from '@mui/material';
import CircularProgressSpinner from './components/ProgressSpinner';
import OrderDetailPage from './order/OrderDetailPage';
import OrderConfirmationPage from './order/OrderConfirmationPage';
import SignUpPage from './login/SignUpPage';
import UserProfile from './login/UserProfile';
import OrderListPage from './order/OrderListPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

    <BrowserRouter>
      <ApplicationContextProvider>
        <App />
      <Routes>
        <Route path="/" element={<BannerCarousel />} />
        <Route path="/search-results" element={<SearchResult />} />
        <Route path="/category-detail" element={<CategoryDetail />} />
        <Route path="/item-detail" element={<ItemDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path='/login' element={<LogInComponent />} />
        <Route path='/order-detail' element={<OrderDetailPage />} />
        <Route path='/order-confirmation' element={<OrderConfirmationPage />} />
        <Route path='/signUp' element={<SignUpPage />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/my-orders' element={<OrderListPage />} />
      </Routes>
            </ApplicationContextProvider>
    </BrowserRouter>

  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
