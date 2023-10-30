import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";
const useDeleteBookHook = () => {
  const [loading, setLoading] = useState(false);
  const deleteBookByID = (bookID) => {
    setLoading(true);
    console.log(bookID);
    axiosInstance
      .delete(`/deleteBooks?bookID=${bookID}`)
      .then((resp) => {
        console.log("Successfully deleted", resp.data);
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { deleteBookByID, loading };
};

export default useDeleteBookHook;
