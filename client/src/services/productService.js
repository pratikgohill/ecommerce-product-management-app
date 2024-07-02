import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getProducts = () => {
  return axios.get(`${API_URL}/api/products`);
};

export const getProductById = (id) => {
  return axios.get(`${API_URL}/api/products/${id}`);
};

export const createProduct = (productData) => {
  return axios.post(`${API_URL}/api/products`, productData);
};

export const updateProduct = (id, productData) => {
  return axios.put(`${API_URL}/api/products/${id}`, productData);
};

export const deleteProduct = (id) => {
  return axios.delete(`${API_URL}/api/products/${id}`);
};
