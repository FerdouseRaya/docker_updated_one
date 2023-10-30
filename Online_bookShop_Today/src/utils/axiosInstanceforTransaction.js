import axios from "axios";

const axiosInstanceforTransactions = axios.create({
  baseURL: "http://127.0.0.1:8000/transactions",
  timeout: 5000,
});
export default axiosInstanceforTransactions;
