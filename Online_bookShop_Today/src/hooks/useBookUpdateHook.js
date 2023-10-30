import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
const useBookUpdateHook = () => {
  // const [updateBookData, setUpdateBookData] = useState([]);
  const[loading,setLoading] =useState(false);
  const updateBookByID = (payload) => {
    setLoading(true);
    console.log("The form data ", payload);
    axiosInstance
      .patch("/editInfo", payload)
      .then((resp) => resp.data)
      .then((data) => {
        setLoading(false)
        console.log("Successfully updated", data);
        // setUpdateBookData([...updateBookData, data]);
        return data;
      })
      .catch((error) => {
        setLoading(false)
        console.error("Error:", error);
        throw error;
      });
  };
  return {updateBookByID,loading};
};

export default useBookUpdateHook;
