import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import useBookByID from "../../../../hooks/useBookByIDHook";
import "./BookDetails.scss";
import useCartHook from "../../../../hooks/useCartHook";
import { addToCart } from "../../../../source/slices/cartSlice";
import { useDispatch } from "react-redux";
import AddReviewForm from "../../ReviewRating/ReviewRating";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';



const BookDetails = () => {
  // const { ISBN } = useParams();
  const { bookDataDetails, bookDetails } = useBookByID([]);
  const { bookID } = useParams();
  console.log(bookID);
  const check = localStorage.getItem("token");
  const decodedToken = jwt_decode(check);
  const userId = decodedToken.user._id;
  const userRole = decodedToken.user.role;
  console.log('Decoded userId:', userId);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { addItemtoCart ,decreaseItemFromCart} = useCartHook();
  
  useEffect(() => {
    if (bookID) {
      console.log(bookID);
      bookDetails(bookID);
    }
  }, [bookID]);

  if (!bookDataDetails || bookDataDetails.length === 0) {
    return <div className="product-not-found">Product not found</div>;
  }

  const bookData = bookDataDetails[0];
  console.log(bookData);
  const handleAddToCart = (e) => {
    e.preventDefault(); 

    if (!check) {
      // User is not logged in, show a toast message
      toast.error('You need to log in first.', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/login-signUp');
      return;
    }
    
    if (userRole !== 2) {
      // User's role is not 2, show another toast message
      toast.error('You do not have permission to perform this action.', {
        position: 'top-right',
        autoClose: 3000,
      });
      // navigate('/login-signUp');
      return;
    }
    const payload = {
      book: bookID,
      quantity: quantity,
    };
    console.log(payload);
    console.log(check);
    addItemtoCart(payload, check);
    dispatch(addToCart(payload));
    toast.success('Added to cart successfully!', {
      position: 'top-right',
      autoClose: 3000, 
    });
  };
  
  const handleRemoveFromCart = (e) => { 
    e.preventDefault();
    if (!check) {
      
      navigate('/login-signUp');
      return;
    }
    console.log(userId)
    console.log(bookID)
    const payload1 = {
      user:userId,
      book: bookID,
      quantity: quantity,
    };
    console.log(payload1);
    decreaseItemFromCart(payload1);
    toast.success('Decresing Item from cart successfully!', {
      position: 'top-right',
      autoClose: 3000,
      
    });
  };
  return (
    <div className="container-bookdetails">
      <div className="card-bookdetails">
        <div className="card-content-bookdetails">
          {bookData && (
            <>
              <img
                className="bookdetails-image"
                src={bookData.img}
                alt={bookData.title}
              />
              <div className="bookdetails-info">
                <h2>Title: {bookData.title}</h2>
                <h2>ISBN: {bookData.ISBN}</h2>
                <h2>Author: {bookData.author}</h2>
                <h2>Genre: {bookData.genre}</h2>
                <h2>Stock: {bookData.stock}</h2>
                <h2>PageCount: {bookData.pageCount}</h2>
                <h2>Price: ${bookData.price}</h2>
              </div>
              <div></div>
            </>
          )}
          {bookData && bookData.reviews && bookData.reviews.length > 0 && (
            <div className="card-reviews">
              <h3>Reviews</h3>
              <ul>
                {bookData.reviews.map((review, index) => (
                  <li key={index}>{review.reviewContent}
                  <AddReviewForm bookId={bookID} reviewId={review.reviewId} reviewContent={review.reviewContent} rating={review.rating}/></li>
                  
                ))}
                
              </ul>
              
            </div>
            
          )}
          <div className="button-container">
          <button
              onClick={(e) => {handleRemoveFromCart(e)}}
              className="plus-button custom-btn-success"
            >
              -
            </button>
            <button
              onClick={(e)=>{handleAddToCart(e)}}
              className="custom-btn custom-btn-success"
            >
              Add to Cart
            </button>
            <button
              onClick={(e)=>{handleAddToCart(e)}}
              className="plus-button custom-btn-success"
            >
              +
            </button>
          </div>
          <ToastContainer />
          
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
