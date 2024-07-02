import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ComboList from "./components/ComboList";
import ProductForm from "./pages/ProductForm";
import ComboForm from "./pages/ComboForm";
import NavBar from "./pages/NavBar";
import Cart from "./components/Cart";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<ProductList />} />
          {/* <Route path="/products" element={<ProductList />} /> */}
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/combos" element={<ComboList />} />
          <Route path="/create-product" element={<ProductForm />} />
          <Route path="/edit-product/:id" element={<ProductForm />} />
          <Route path="/create-combo" element={<ComboForm />} />
          <Route path="/edit-combo/:id" element={<ComboForm />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
