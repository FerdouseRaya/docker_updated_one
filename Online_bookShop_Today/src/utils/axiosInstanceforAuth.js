import axios from "axios";

const axiosInstanceforAuth = axios.create({
  // baseURL: "http://127.0.0.1:8000/auth",
  //baseURL: "http://localhost:8000/auth",
  // baseURL:"http://35.180.242.220:5173/auth",
  baseURL: "http://35.181.53.227:5173/auth",
  timeout: 5000,
});
axiosInstanceforAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer${token}`;
  }
  return config;
});
export default axiosInstanceforAuth;
