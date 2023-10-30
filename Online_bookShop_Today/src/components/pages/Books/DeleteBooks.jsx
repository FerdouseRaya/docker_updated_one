import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { deleteByID } from "../../../source/slices/booksSlice"; 
import useDeleteBookHook from '../../../hooks/useDeleteBookHook'
//import "./Books.scss"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
const DeleteBook = () => {
  const { bookID } = useParams();
  console.log(bookID);
  const { deleteBookByID,loading } = useDeleteBookHook();
  const dispatch = useDispatch();

  useEffect(() => {
    // Delete the book when the component loads
    deleteBookByID(bookID);
    dispatch(deleteByID(bookID));
    toast.success('Book Deleted!', {
      position: 'top-right',
      autoClose: 3000,
      
    });
  }, [bookID, deleteBookByID, dispatch]);

  return (
    <div className="delete-book-container">
    {loading ? (
      <h1 className="loading-text">Loading... Please wait.</h1>
    ) : (
      <h1>Book is deleted!</h1>
    )}
    
  </div>
  );
};

export default DeleteBook;
