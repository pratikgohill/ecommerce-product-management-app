import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import { getProductById } from "../services/productService";
import { addToCart } from "../services/cartService";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Card>
        <CardMedia
          component="img"
          maxHeight="140"
          image={product.mainImage}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="h6">Company: {product.company}</Typography>
          <Typography variant="h6">
            Price: ${product.mainPrice}
            {product.discountedPrice && (
              <>
                <br /> Discount Price : ${product.discountedPrice}
              </>
            )}
          </Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Box>
            <Typography variant="h6">Overview</Typography>
            {product.overview.map((item, index) => (
              <Typography key={index}>
                {item.key}: {item.value}
              </Typography>
            ))}
          </Box>
          <Grid container spacing={2}>
            {product.images.map((image, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <CardMedia
                  component="img"
                  height="100"
                  image={image}
                  alt={`Product Image ${index + 1}`}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            size="small"
            onClick={() => navigate(`/edit-product/${product._id}`)}
          >
            Edit
          </Button>
          <Button size="small" onClick={() => addToCart(product)}>
            Add TO Cart
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetail;
