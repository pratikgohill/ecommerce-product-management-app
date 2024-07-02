import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { getCombos } from "../services/comboService";
import ProductCard from "../pages/ProductCard";
import { addToCart } from "../services/cartService";
import { ShoppingCart } from "@mui/icons-material";

const ComboList = () => {
  const [combos, setCombos] = useState([]);
  const navigate = useNavigate();

  // fetching combo products
  useEffect(() => {
    getCombos()
      .then((response) => {
        setCombos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching combos:", error);
      });
  }, []);

  return (
    <Grid container spacing={3}>
      {combos.map((combo) => (
        <Grid item key={combo._id} xs={12} sm={6} md={4}>
          <Box
            sx={{
              boxShadow: 3,
              borderRadius: 8,
              bgcolor: "background.paper",
              maxWidth: 600,
            }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6">{combo.name}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Totoal Main Price: $
                  {combo.products.map((product, index) => (
                    <>
                      {product.mainPrice}{" "}
                      {index + 1 === combo.products.length ? "" : "+"}
                    </>
                  ))}
                  ={" "}
                  {combo.products.reduce((acc, product) => {
                    if (product) {
                      return acc + product.mainPrice;
                    }
                    return acc;
                  }, 0)}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Totoal Discount Price: $
                  {combo.products.map((product, index) => (
                    <>
                      {product.discountedPrice}{" "}
                      {index + 1 === combo.products.length ? "" : "+"}
                    </>
                  ))}
                  ={" "}
                  {combo.products.reduce((acc, product) => {
                    if (product) {
                      return acc + product.discountedPrice;
                    }
                    return acc;
                  }, 0)}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Combo Price: ${combo.comboPrice}
                </Typography>
                <Grid container spacing={2}>
                  {combo.products.map((product, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>
                <Button
                  size="small"
                  onClick={() => navigate(`/edit-combo/${combo._id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  endIcon={<ShoppingCart />}
                  size="small"
                  onClick={() => addToCart(combo)}
                >
                  Add TO Cart
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ComboList;
