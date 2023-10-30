import axios from "axios";

const axiosInstanceforReview = axios.create({
  baseURL: "http://127.0.0.1:8000/reviews",
  timeout: 5000,
});
export default axiosInstanceforReview;
