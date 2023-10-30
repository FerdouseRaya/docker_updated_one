import { useState, useEffect } from "react";
import axiosInstanceforReview from "../../utils/axiosInstanceforReview";

const useReviewDeleteHook = () => {
  const deleteReviewByID = (payload) => {
    console.log("From hook payload:", payload);
    axiosInstanceforReview
      .delete(`/removeReviewandRating`, { data: { ...payload } })
      .then((resp) => {
        console.log("Successfully deleted", resp.data);
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  return { deleteReviewByID };
};
export default useReviewDeleteHook;
