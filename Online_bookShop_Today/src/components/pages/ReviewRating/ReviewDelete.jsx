// DeleteReviewButton.js
import React from 'react';
import { useDispatch } from 'react-redux';
import useReviewDeleteHook from '../../../hooks/Users/useReviewDeleteHook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReviewDelete= ({ user,bookId, reviewId }) => {
  const dispatch = useDispatch();
  const{deleteReviewByID}=useReviewDeleteHook(); 
  const handleDeleteReview = () => {
    const payload = {
        user:user,
      bookID: bookId,
      reviewId: reviewId
    };
    console.log("From component:",payload)
    deleteReviewByID(payload);
    toast.success('Review and Rating Deleted!', {
      position: 'top-right',
      autoClose: 3000,
      
    });
  };

  return (
    <button type="button" onClick={handleDeleteReview}>Delete</button>
  );
};

export default ReviewDelete;
