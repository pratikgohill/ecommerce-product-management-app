import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getCombos = () => {
  return axios.get(`${API_URL}/api/combos`);
};

export const createCombo = (comboData) => {
  return axios.post(`${API_URL}/api/combos`, comboData);
};

export const updateCombo = (id, comboData) => {
  return axios.put(`${API_URL}/api/combos/${id}`, comboData);
};

export const deleteCombo = (id) => {
  return axios.delete(`${API_URL}/api/combos/${id}`);
};

export const getComboById = (id) => {
  return axios.get(`${API_URL}/api/combos/${id}`);
};
