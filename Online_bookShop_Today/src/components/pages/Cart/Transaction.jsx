import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchTransaction} from '../../../source/slices/transactionSlice'
//import "./Cart.scss"; 
import jwt_decode from 'jwt-decode';
import useCartHook from "../../../hooks/useCartHook";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTransactionHook from "../../../hooks/Users/useTransactionHook";
// import CheckoutButton from "./Checkout";

const Transactions = () => {
  const { cartItems, total } = useSelector((state) => state.cart);
  const { transaction, viewTransaction } = useTransactionHook();
  const cartID = cartItems._id;
  console.log("cartID",cartID);

  const check = localStorage.getItem("token");
  const decodedToken = jwt_decode(check);
  const userId = decodedToken.user._id;
  console.log("userID:", userId);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(userId);
    console.log(cartID);
    const payload = {
      user: userId,
      cart: cartID,
    };
    console.log("From Component", payload);
    viewTransaction(payload);
    dispatch(fetchTransaction(payload));
  }, [dispatch, userId, cartID, viewTransaction]);

  return (
    <div>
      <h1>Transaction Information</h1>
      {transaction && transaction.result ? (
        transaction.result.map((item, index) => (
          <div key={index}>
            <h2>Transaction {index + 1}</h2>
            <p>User: {item.user.name}</p>
            <p>Email: {item.user.email}</p>
            <p>Phone: {item.user.phone}</p>
            <p>Wallet Balance: {item.user.wallets_balance}</p>

            <h3>Books:</h3>
            <ul>
              {item.books.map((book, bookIndex) => (
                <li key={bookIndex}>
                  <p>Title: {book.book.title}</p>
                  <p>Author: {book.book.author.join(", ")}</p>
                  <p>ISBN: {book.book.ISBN}</p>
                  <p>Genre: {book.book.genre}</p>
                  <p>Price: {book.book.price}</p>
                  <p>Language: {book.book.language.join(", ")}</p>
                  <p>Stock: {book.book.stock}</p>
                  <p>Quantity: {book.quantity}</p>
                </li>
              ))}
            </ul>

            <p>Total: {item.Total}</p>
          </div>
        ))
      ) : (
        <p>No transaction data available.</p>
      )}
    </div>
  );
};


export default Transactions;
