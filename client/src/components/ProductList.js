import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { getProducts } from "../services/productService";
import ComboList from "./ComboList";
import { addToCart } from "../services/cartService";
import { ShoppingCart } from "@mui/icons-material";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <>
      <Box>
        <Typography variant="h4" gutterBottom>
          Product List
        </Typography>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Box>
                <Card sx={{ maxWidth: 300, maxHeight: 300 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.mainImage}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.company}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${product.mainPrice}
                      {product.discountedPrice && (
                        <>
                          <br /> Discount Price : ${product.discountedPrice}
                        </>
                      )}
                    </Typography>
                  </CardContent>
                </Card>
                <Button
                  size="small"
                  //   variant="outlined"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  Details
                </Button>
                <Button
                  size="small"
                  //   variant="outlined"
                  onClick={() => navigate(`/edit-product/${product._id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  endIcon={<ShoppingCart />}
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <br />

      <ComboList />
    </>
  );
};

export default ProductList;
