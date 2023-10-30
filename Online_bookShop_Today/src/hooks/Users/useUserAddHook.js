import { useState, useEffect } from "react";
import axiosInstanceforUser from "../../utils/axiosInstanceforUser";

const useUserAddHook = () => {
  const [userData, setUserData] = useState([]);

  const createUser = (formData) => {
    console.log("The form data ", formData);
    axiosInstanceforUser
      .post("/create", formData)
      .then((resp) => {
        console.log("Response Data:", resp.data);
        setUserData([...userData, resp.data]);
        resp.data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return { userData, setUserData, createUser };
};

export default useUserAddHook;
