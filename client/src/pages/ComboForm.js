import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box,
  Typography,
} from "@mui/material";
import {
  createCombo,
  getComboById,
  updateCombo,
} from "../services/comboService";
import { getProducts } from "../services/productService";
import { ToastContainer, toast } from "react-toastify";

const ComboForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [combo, setCombo] = useState({
    name: "",
    comboPrice: "",
    products: [],
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (id) {
      console.log("yoyoyo");
      getComboById(id)
        .then((response) => {
          setCombo(response.data);
        })
        .catch((error) => {
          console.error("Error fetching combo:", error);
        });
    }

    getProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCombo({ ...combo, [name]: value });
  };

  const handleProductChange = (product) => {
    setCombo((prevState) => {
      const productExists = prevState.products.find(
        (p) => p._id === product._id
      );
      const products = productExists
        ? prevState.products.filter((p) => p._id !== product._id)
        : [...prevState.products, product];
      return { ...prevState, products };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productIds = combo.products.map((product) => product._id);
    const comboData = { ...combo, products: productIds };

    console.log(comboData);

    if (id) {
      updateCombo(id, comboData)
        .then(() => {
          navigate("/combos");
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.message || "Something Went Wrong",
            {
              position: "top-center",
            }
          );

          console.error("Error updating combo:", error);
        });
    } else {
      createCombo(comboData)
        .then(() => {
          navigate("/combos");
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.message || "Something Went Wrong",
            {
              position: "top-center",
            }
          );
          console.error("Error creating combo:", error);
        });
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        {id ? "Update Combo" : "Create Combo"}
      </Typography>
      <TextField
        label="Combo Name"
        name="name"
        value={combo.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Combo Price"
        name="comboPrice"
        type="number"
        value={combo.comboPrice}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Typography variant="h6" gutterBottom>
        Select Products
      </Typography>
      <FormGroup>
        {products.map((product) => (
          <FormControlLabel
            key={product._id}
            control={
              <Checkbox
                checked={
                  combo.products.find((p) => p._id === product._id) !==
                  undefined
                }
                onChange={() => handleProductChange(product)}
              />
            }
            label={product.name}
          />
        ))}
      </FormGroup>
      <Button type="submit" variant="contained" color="primary">
        {id ? "Update Combo" : "Create Combo"}
      </Button>
      <ToastContainer />
    </Box>
  );
};

export default ComboForm;
