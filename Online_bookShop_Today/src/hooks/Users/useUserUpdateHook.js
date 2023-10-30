import { useState, useEffect } from "react";
import axiosInstanceforUser from "../../utils/axiosInstanceforUser";
const useUserUpdateHook = () => {
  const [updateUsersData, setUpdateUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const updateUserByID = (payload) => {
    setLoading(true);
    console.log("The form data ", payload);
    axiosInstanceforUser
      .patch("/editUsersInfo", payload)
      .then((resp) => {
        resp.data;
        console.log("Successfully updated", resp.data);
        setUpdateUsersData([...updateUsersData, resp.data]);
        return resp.data;
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  };
  const updateBalanceUser = (payload) => {
    setLoading(true);
    console.log("The form data ", payload);
    axiosInstanceforUser
      .patch("/updateBalance", payload)
      .then((resp) => {
        resp.data;
        console.log("Successfully updated", resp.data);
        setUpdateUsersData([...updateUsersData, resp.data]);
        return resp.data;
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  };
  return {
    updateUsersData,
    setUpdateUsersData,
    updateUserByID,
    updateBalanceUser,
    loading,
  };
};

export default useUserUpdateHook;
