export const addToCart = (item) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const updatedCart = [...cart, item];
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

export const removeFromCart = (item) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const updatedCart = cart.filter((it) => it.id !== item._id);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};
