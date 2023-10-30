import { useState, useEffect } from "react";
//import axiosInstanceforCart from "../utils/axiosInstanceforCart";
import { useNavigate } from "react-router-dom";
import axiosInstanceforTransactions from "../../utils/axiosInstanceforTransaction";

const useTransactionHook = () => {
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState(null);

  const checkout = (payload) => {
    setLoading(true);

    axiosInstanceforTransactions
      .post("/checkout", payload)
      .then((response) => {
        console.log("Successfully CheckedOut");
        console.log("Response Data:", response.data);
        // Update cartData state if needed
        setData(response.data); // You can update cartData with the response
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const viewTransaction = (payload) => {
    setLoading(true);

    axiosInstanceforTransactions
      .get("/viewTransaction", payload)
      .then((response) => {
        console.log("Transaction Data");
        console.log("Response Data:", response.data);
        setTransaction(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { transaction, checkout, viewTransaction, setLoading };
};

export default useTransactionHook;
