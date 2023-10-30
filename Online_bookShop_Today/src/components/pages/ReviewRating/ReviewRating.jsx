// components/AddReviewForm.js
//import "./ReviewRating.scss"
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import { addReviewAndRating } from '../../../source/slices/reviewsSlice';
import useReviewAddHook from '../../../hooks/Users/useReviewAddHook';
import ReviewDelete from './ReviewDelete';
import jwt_decode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReviewEdit from "./ReviewEdit";
// import useReviewDeleteHook from '../../../hooks/Users/useReviewDeleteHook';
const AddReviewForm = ({ bookId,reviewId ,reviewContent,rating }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [showReviewEdit, setShowReviewEdit] = useState(false);
  const { handleSubmit, control, reset, formState: { errors } } = useForm(); 
  const { postReviewRating} =useReviewAddHook();  
  // const{deleteReviewByID}=useReviewDeleteHook();
  
  const jwtToken = localStorage.getItem("token"); 
  const decodedToken = jwt_decode(jwtToken);
  const userId = decodedToken.user._id;

  console.log('Decoded userId:', userId);

  const onSubmit = (data) => {
    
    const book = bookId; 
        
    const formData = {
      book,
      review: data.review,
      rating: data.rating,
    };
    console.log("Data",formData.review);
    toast.success('Review and Rating added Successgfully!', {
      position: 'top-right',
      autoClose: 3000, 
    });
    postReviewRating(formData,jwtToken)
    dispatch(addReviewAndRating(formData))
  };
  const handleEditClick = () => {
    setShowReviewEdit(true);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="reviewForm">
      <label>
        Review:
        <Controller
          name="review"
          control={control}
          render={({ field }) => (
            <div>
              <textarea {...field} className="reviewInput"style={{ border: errors.title ? "1px solid red" : "" }} />
              {errors.review && <p className="error">Review is required.</p>}
            </div>
          )}
          rules={{ required: 'Review is required' }} 
        />
      </label>
      <label>
        Rating (1-4):
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <div>
              <input
                type="number"
                {...field}
                className="ratingInput"
                style={{ border: errors.rating ? "1px solid red" : "" }}
                min="1" 
                max="4" 
              />
              {errors.rating && <p className="error">Rating must be between 1 and 4.</p>}
            </div>
          )}
          rules={{
            required: 'Rating is required',
          }}
        />
      </label>
      <button type="submit"className="submit" >Submit Review</button>
      {/* <button type="button" className="edit"
            onClick={() =>
              navigate(`/home/${bookId}/${reviewId}/${userId}`)
            }>Edit</button> */}
             <div>
      <button className ="edit" onClick={handleEditClick}>Edit</button>

      {showReviewEdit && <ReviewEdit bookId={bookId} reviewId={reviewId} user={userId} reviewContent={reviewContent} rating={rating}/>}
    </div>
      <ReviewDelete bookId={bookId} reviewId={reviewId} user={userId}/>
      
      {/* <button type="button" onClick={handleDeleteReview}>Delete</button> */}
    </form>
  );
};

export default AddReviewForm;
