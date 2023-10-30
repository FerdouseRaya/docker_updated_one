import { useState, useEffect } from "react";
import axiosInstanceforCart from "../utils/axiosInstanceforCart";
import { useNavigate } from "react-router-dom";

const useCartHook = () => {
  const [loading, setLoading] = useState(false);
  const [cartData, setCartData] = useState(null); // Define cartData state

  const addItemtoCart = (payload, check) => {
    setLoading(true);

    axiosInstanceforCart
      .post("/addtoCart", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${check}`,
        },
      })
      .then((response) => {
        console.log("Response Data:", response.data);
        // Update cartData state if needed
        setCartData(response.data); // You can update cartData with the response
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const removeItemFromCart = (payload, check) => {
    setLoading(true);
    console.log(payload);
    console.log("From hook:", check);
    axiosInstanceforCart
      .delete("/removefromCart", { data: { ...payload } })
      .then((response) => {
        console.log("Data Deleted:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const decreaseItemFromCart = (payload1) => {
    setLoading(true);
    console.log("From hook:", payload1);
    axiosInstanceforCart
      .patch("/decrease", payload1)
      .then((response) => {
        console.log("Data decreased:", response.data);
        setCartData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return {
    cartData,
    loading,
    addItemtoCart,
    removeItemFromCart,
    decreaseItemFromCart,
  };
};

export default useCartHook;
