import { useState, useEffect } from "react";
import axiosInstanceforReview from "../../utils/axiosInstanceforReview";

const useReviewAddHook = () => {
  const [reviewData, setreviewData] = useState([]);
  const[loading,setLoading] =useState(false);

  const postReviewRating = (formData, check) => {
    console.log("From hook Data: ", formData);
    console.log("From hook:", check);
    axiosInstanceforReview
      .post("/addtoReviewandRating", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${check}`,
        },
      })
      .then((resp) => {
        console.log("Response Data:", resp.data);
        setreviewData([...reviewData, resp.data]);
        resp.data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
const editReviewRating =(formData) =>{
  console.log("From hook Data: ", formData);
  console.log("From hook:", check);
  axiosInstanceforReview
    .post("/updateReviewandRating", formData)
    .then((resp) => {
      console.log("Response Data:", resp.data);
      //setreviewData([...reviewData, resp.data]);
      resp.data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

  return { reviewData, setreviewData, postReviewRating,editReviewRating };
};
export default useReviewAddHook;
