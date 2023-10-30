import axios from "axios";

const axiosInstanceforCart = axios.create({
  baseURL: "http://127.0.0.1:8000/carts",
  timeout: 5000,
});
export default axiosInstanceforCart;
