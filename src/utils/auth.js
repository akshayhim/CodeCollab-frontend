// auth.js
import axios from "axios";
import toast from "react-hot-toast";

const BACKEND_URL = "https://codecollab-ry3w.onrender.com/api";

export const register = async (userData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/register`, userData);
    saveToken(response.data.token);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    toast.error("Invalid, check console log");
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/login`, credentials);
    saveToken(response.data.token);
    return response.data;
  } catch (error) {
    toast.error("Invalid Email/Password");
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
