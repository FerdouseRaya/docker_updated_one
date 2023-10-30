// CheckoutButton.js

import React from "react";
import { toast } from 'react-toastify';
import useTransactionHook from "../../../hooks/Users/useTransactionHook";

const CheckoutButton = ({ cart, user }) => {
  const { checkout } = useTransactionHook();
  console.log("Through button:",cart)
  console.log("Through button:",user)
  const handleCheckout = () => {
    const payload = {
      user: user,
      cart: cart,
    };
    checkout(payload);
    toast.success('Successfully Checked Out!', {
      position: 'top-right',
      autoClose: 3000,
      // onClose: () => {
      //   // Refresh the page after the toast is closed
      //   window.location.reload();
      // },
    });
    
  };

  return (
    <button onClick={()=>handleCheckout()}>Checkout</button>
  );
};

export default CheckoutButton;
