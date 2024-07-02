import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  // removing item from cart
  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // calculate main price
  const calculateTotalMainPrice = () => {
    let totalMainPrice = 0;
    cartItems.forEach((item) => {
      if (item.products) {
        item.products.forEach((product) => {
          totalMainPrice += product.mainPrice;
        });
      } else {
        totalMainPrice += item.mainPrice;
      }
    });
    return totalMainPrice;
  };

  // calculate discount price
  const calculateTotalDiscountedPrice = () => {
    let totalDiscountedPrice = 0;
    cartItems.forEach((item) => {
      if (item.products) {
        totalDiscountedPrice += item.comboPrice;
      } else {
        totalDiscountedPrice += item.discountedPrice
          ? item.discountedPrice
          : item.mainPrice;
      }
    });
    return totalDiscountedPrice;
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.map((item, index) => (
        <div key={index}>
          {item.products ? (
            <div>
              <h3>Combo: {item.name}</h3>
              <p>
                Price : $
                {item.products.map((product, index) => (
                  <>
                    {product.mainPrice}{" "}
                    {index + 1 === item.products.length ? "" : "+"}
                  </>
                ))}
                ={" "}
                {item.products.reduce((acc, product) => {
                  if (product) {
                    return acc + product.mainPrice;
                  }
                  return acc;
                }, 0)}
              </p>
              <p>Combo Price: ${item.comboPrice}</p>
              <Button
                variant="outlined"
                color="error"
                onClick={() => removeFromCart(index)}
              >
                Remove
              </Button>
            </div>
          ) : (
            <div>
              <h3>Product: {item.name}</h3>
              <p>Price: ${item.mainPrice}</p>
              <p>
                Discount Price : $
                {item.discountedPrice ? item.discountedPrice : item.mainPrice}
              </p>
              <Button
                variant="outlined"
                color="error"
                onClick={() => removeFromCart(index)}
              >
                Remove
              </Button>
            </div>
          )}
          <hr />
        </div>
      ))}
      <h3>Total Main Price: ${calculateTotalMainPrice()}</h3>
      <h2>Total Discounted Price: ${calculateTotalDiscountedPrice()}</h2>
    </div>
  );
};

export default Cart;
