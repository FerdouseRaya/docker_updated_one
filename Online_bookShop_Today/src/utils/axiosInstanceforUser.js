import axios from "axios";

const axiosInstanceforUser = axios.create({
  baseURL: "http://127.0.0.1:8000/users",
  timeout: 5000,
});
export default axiosInstanceforUser;
