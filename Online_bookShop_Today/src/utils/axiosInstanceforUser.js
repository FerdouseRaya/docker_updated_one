import axios from "axios";

const axiosInstanceforUser = axios.create({
  //baseURL: "http://127.0.0.1:8000/users",
  //baseURL:"http://35.180.242.220:5173/users",
  baseURL: "http://35.181.53.227:5173/users",
  timeout: 5000,
});
export default axiosInstanceforUser;
