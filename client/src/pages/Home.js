import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Ecommerce-App
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          style={{ margin: 10 }}
        >
          All Products
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/combos")}
          style={{ margin: 10 }}
        >
          Combo Products
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/cart")}
          style={{ margin: 10 }}
        >
          Cart
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/create-product")}
          style={{ margin: 10 }}
        >
          Add Product
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/create-combo")}
          style={{ margin: 10 }}
        >
          Add Combo
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
