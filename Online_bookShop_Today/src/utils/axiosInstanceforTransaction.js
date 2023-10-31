import axios from "axios";

const axiosInstanceforTransactions = axios.create({
  //baseURL: "http://127.0.0.1:8000/transactions",
  baseURL: "http://35.181.53.227:5173/transactions",
  timeout: 5000,
});
export default axiosInstanceforTransactions;
