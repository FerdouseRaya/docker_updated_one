import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:8000/books",
  baseURL: "http://localhost:8000/books",
  timeout: 5000,
});
export default axiosInstance;
