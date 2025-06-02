// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar"; // Added Navbar
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";



function App() {
  return (
    <Router>
      <Navbar /> {/* Display Navbar on all pages */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* <Route path="/admin" element={<Admin />} /> */}




        {/* Future: Add Product Detail, Checkout */}
      </Routes>
    </Router>
  );
}

export default App;
