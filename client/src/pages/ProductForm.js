import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "../services/productService";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    mainPrice: "",
    discountedPrice: "",
    company: "",
    mainImage: "",
    images: [],
    overview: [],
    description: "",
  });
  const [overviewKey, setOverviewKey] = useState("");
  const [overviewValue, setOverviewValue] = useState("");

  useEffect(() => {
    if (id) {
      getProductById(id)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleOverviewAdd = () => {
    setProduct({
      ...product,
      overview: [
        ...product.overview,
        { key: overviewKey, value: overviewValue },
      ],
    });
    setOverviewKey("");
    setOverviewValue("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateProduct(id, product)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    } else {
      createProduct(product)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error creating product:", error);
        });
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        {id ? "Update Product" : "Create Product"}
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={product.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Main Price"
        name="mainPrice"
        type="number"
        value={product.mainPrice}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Discounted Price"
        name="discountedPrice"
        type="number"
        value={product.discountedPrice}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Company"
        name="company"
        value={product.company}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Main Image URL"
        name="mainImage"
        value={product.mainImage}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Images (comma separated URLs)"
        name="images"
        value={product.images.join(",")}
        onChange={(e) =>
          setProduct({ ...product, images: e.target.value.split(",") })
        }
        fullWidth
        margin="normal"
      />
      <Box>
        <Typography variant="h6" gutterBottom>
          Overview
        </Typography>
        <TextField
          label="Key"
          value={overviewKey}
          onChange={(e) => setOverviewKey(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Value"
          value={overviewValue}
          onChange={(e) => setOverviewValue(e.target.value)}
          margin="normal"
        />
        <Button variant="outlined" onClick={handleOverviewAdd}>
          Add Overview
        </Button>
        <Box>
          {product.overview.map((item, index) => (
            <Typography key={index}>
              {item.key}: {item.value}
            </Typography>
          ))}
        </Box>
      </Box>
      <TextField
        label="Description"
        name="description"
        value={product.description}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        {id ? "Update Product" : "Create Product"}
      </Button>
    </Box>
  );
};

export default ProductForm;
