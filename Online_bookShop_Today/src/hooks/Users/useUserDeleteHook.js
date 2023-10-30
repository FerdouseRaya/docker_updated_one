import axiosInstanceforUser from "../../utils/axiosInstanceforUser";
import { useState } from "react";
const useUserDeleteHook = () => {
  const [loading, setLoading] = useState(false);
  const deleteUsersByID = (userID) => {
    console.log(userID);
    axiosInstanceforUser
      .delete(`/deleteuser?userID=${userID}`)
      .then((resp) => {
        console.log("Successfully deleted", resp.data);
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  return { deleteUsersByID, loading };
};

export default useUserDeleteHook;
