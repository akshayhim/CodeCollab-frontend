// auth.js

import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Replace with your backend API URL

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    saveToken(response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    saveToken(response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};
