import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:8000/books",
  // baseURL: "http://localhost:8000/books",
  baseURL:"http://35.180.242.220/books",
  timeout: 5000,
});
export default axiosInstance;
