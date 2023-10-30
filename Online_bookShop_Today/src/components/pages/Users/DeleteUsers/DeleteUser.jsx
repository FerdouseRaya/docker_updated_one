import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { deleteUserByID } from "../../../../source/slices/userSlice"; 
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUserDeleteHook from "../../../../hooks/Users/useUserDeleteHook";
const DeleteUser = () => {
  const { userID } = useParams();
  console.log(userID);
  const { deleteUsersByID,loading}=useUserDeleteHook();
  const dispatch = useDispatch();

  useEffect(() => {
    
    deleteUsersByID(userID);
    dispatch(deleteUserByID(userID));
    toast.success('User Deleted!', {
      position: 'top-right',
      autoClose: 3000,
      
    });
  }, [userID, deleteUsersByID, dispatch]);

  return (
    <div>
     {loading ? (
      <h1 className="loading-text">Loading... Please wait.</h1>
    ) : (
      <h1>User is deleted!</h1>
    )}     
    </div>
  );
};

export default DeleteUser;
