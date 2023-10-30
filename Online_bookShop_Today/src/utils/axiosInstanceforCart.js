import axios from "axios";

const axiosInstanceforCart = axios.create({
  //baseURL: "http://127.0.0.1:8000/carts",
  baseURL:"http://35.180.242.220:5173/carts",
  timeout: 5000,
});
export default axiosInstanceforCart;
