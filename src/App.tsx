// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import SingleProduct from "./pages/SingleProduct";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { AppProvider } from "./context/AppContext";
import { CartProvider } from "./context/CartContext";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <AppProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/products/:productId" element={<SingleProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<ProtectedRoute component={Checkout} />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AppProvider>
  );
};

export default App;
