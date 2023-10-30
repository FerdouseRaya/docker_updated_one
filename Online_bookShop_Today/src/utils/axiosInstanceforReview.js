import axios from "axios";

const axiosInstanceforReview = axios.create({
  //baseURL: "http://127.0.0.1:8000/reviews",
  baseURL:"http://35.180.242.220:5173/reviews",
  timeout: 5000,
});
export default axiosInstanceforReview;
