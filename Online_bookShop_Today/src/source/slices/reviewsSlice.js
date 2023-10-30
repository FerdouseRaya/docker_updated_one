import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    bookReviews: [],
  },
  reducers: {
    addReviewAndRating: (state, action) => {
     
      state.bookReviews.push(action.payload);
    },
    removeReview: (state, action) => {
      
      const reviewId = action.payload;
      return state.bookReviews.filter((review) => review.id !== reviewId);
    },
  },
});

export const { addReviewAndRating ,removeReview} = reviewSlice.actions;
export default reviewSlice.reducer;
