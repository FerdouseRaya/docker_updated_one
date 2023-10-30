import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../source/slices/cartSlice";
import axiosInstanceforCart from "../../../utils/axiosInstanceforCart";
//import "./Cart.scss";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import useCartHook from "../../../hooks/useCartHook";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTransactionHook from "../../../hooks/Users/useTransactionHook";
import CheckoutButton from "./Checkout";
// import { addUsers } from "../../../source/slices/userSlice";

const ShowCarts = () => {
  // const { cartItems, total } = useSelector((state) => state.cart);
  const [cart, setCart] = useState(null);
  const check = localStorage.getItem("token");
  const decodedToken = jwt_decode(check);
  const userId = decodedToken.user._id;
  console.log("userID:",userId);
  const [quantity, setQuantity] = useState(1);
  // const { getCartItems } = useCartHook();
  const dispatch = useDispatch();
  const { removeItemFromCart } = useCartHook();
  const{checkout}=useTransactionHook();

  useEffect(() => {
    axiosInstanceforCart
      .get("/viewCart", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${check}`,
        },
      })
      .then((resp) => resp.data)
      .then((data) => {
        console.log("Data: ", data.result);
        setCart(data.result);
        dispatch(getCart(data.result));
        
      });
  }, [dispatch]);
  console.log("Cart fetched:", cart);

  const handleRemoveFromCart = (bookID) => {
    console.log(bookID)
    console.log(userId)
    const payload = {
      user:userId,
      book: bookID,
      quantity: quantity,
    };
    console.log("From Component", payload);
    removeItemFromCart(payload);
  };
  if (!cart) {
    return <p className="error-text">Cart is empty.</p>;
  }

  const booksArray = Object.keys(cart.books).map((key) => cart.books[key]);
  return (
    <div className="show-container">
      <h1>My Carts</h1>
      <div className="show-second-container">
        <div>
          <p>Total: ${cart.Total}</p>
          <p>User: {cart.user}</p>
          <p>Cart:{cart._id}</p>
          <ul>
            {booksArray.length > 0 && (
              <ul>
                {booksArray.map((bookInfo) => (
                  <li key={bookInfo.book._id}>
                    <h3>{bookInfo.book.title}</h3>
                    <p>Price: ${bookInfo.book.price}</p>
                    <p>Author: {bookInfo.book.author[0]}</p>
                    <p>Quantity: {bookInfo.quantity}</p>
                    <button
                      onClick={() => handleRemoveFromCart(bookInfo.book._id)}
                    >
                      delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </ul>
          {/* <button onClick={() => handleCheckout(cart._id)}>Checkout</button> */}
          <CheckoutButton
            cart={cart._id}
            user={userId}  
                      
          />
          <ToastContainer />
          <hr />
          
        </div>
      </div>
    </div>
  );
};

export default ShowCarts;
