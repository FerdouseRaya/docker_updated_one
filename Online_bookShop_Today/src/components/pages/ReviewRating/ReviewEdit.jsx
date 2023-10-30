import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ReviewRating.scss"; // Make sure the file name matches the actual file name.
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';
import useReviewAddHook from "../../../hooks/Users/useReviewAddHook";

const ReviewEdit = ({ user, bookId, reviewId, reviewContent, rating }) => {
  const location = useLocation();
  const navigate = useNavigate();
 const{editReviewRating}=useReviewAddHook();
  console.log("bookId:",bookId);
  console.log('userId:', user);
  console.log('reviewId:',reviewId);
  console.log("reviews:",reviewContent);
  console.log("rating:",rating)

  const check = localStorage.getItem("token");
  const decodedToken = jwt_decode(check);
  const userRole = decodedToken.user.role;

  // State to manage form input
  const [updatedReviewContent, setUpdatedReviewContent] = useState(reviewContent);
  const [updatedRating, setUpdatedRating] = useState(rating);

  // Define a function to handle editing the review and rating
  const handleEditReview = async () => {
    try {
      const updatedReview = {
        user: user,
        bookID: bookId,
        reviewID: reviewId,
        reviews: updatedReviewContent,
        rating: updatedRating,
      }; 
      editReviewRating(updatedReview); 

      if (response.status === "success") {

        toast.success("Review and rating updated successfully!",{
          position: 'top-right',
          autoClose: 3000, 
        });
        
      } else {
        toast.error("Failed to update review and rating.",{
          position: 'top-right',
          autoClose: 3000, 
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating review and rating.", {
        position: 'top-right',
        autoClose: 3000, 
      });
    }
  };

  return (
    <div >
      {/* Display book and review information here */}
      <h2>Edit Review</h2>
      <div className="review-edit-form">
        {/* Input fields for editing the review and rating */}
        <textarea
          rows="4"
          cols="50"
          value={updatedReviewContent}
          onChange={(e) => setUpdatedReviewContent(e.target.value)}
        />
        <label>Rating:</label>
        <input
          type="number"
          value={updatedRating}
          onChange={(e) => setUpdatedRating(e.target.value)}
          min="1"
          max="4"
        />
      </div>

      {/* Check user role and conditionally render the edit button */}
      {userRole === 1 || (userRole === 2 && user === decodedToken.user.id) ? (
        <button onClick={handleEditReview}  className="update-review-button">Update Review</button>
      ) : null}
    </div>
  );
};

export default ReviewEdit;
