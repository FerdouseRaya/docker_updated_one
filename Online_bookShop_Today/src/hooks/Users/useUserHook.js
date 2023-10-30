import { useState, useEffect } from "react";
import axiosInstanceforUser from '../../utils/axiosInstanceforUser'

const useUsersHook = () => {
  const [userData, setUserData] = useState([]);

  const getData = () => {
    axiosInstanceforUser
    .get("/viewUsers")
    .then((resp) => resp.data)
    .then((data) => {
      console.log("Data: ", data.result.result);      
      setUserData(data.result.result);
  })}
  return { userData, setUserData, getData };
};

export default useUsersHook;
