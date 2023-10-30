import useBookUpdateHook from '../../../hooks/useBookUpdateHook';
import {useDispatch ,useSelector} from 'react-redux';
import { useLocation ,useParams } from "react-router-dom";
import { updateBookInfo } from "../../../source/slices/booksSlice";
//import './Books.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from "react";


const UpdateBook = () => {
  const { updateBookByID ,loading} = useBookUpdateHook();
  const dispatch =useDispatch();
  const location = useLocation();
  console.log("The state data ", location);
  const{bookID} =useParams();
  const bookInfo= useSelector((state) => state.books);
  console.log(bookInfo)
  console.log(bookID)
  const [formData, setFormData] = useState({
    bookID: bookID,
    author: '',
    ISBN: '',
    genre: '',
    price: '',
    stock: '',
    pageCount: '',
    language: '',
    availability: '',
    bestseller: ''
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    const payload = {
      bookID: bookID,
      updatedData: formData, 
    };
    const filteredData = Object.keys(payload.updatedData).reduce((acc, key) => {
      if (payload.updatedData[key] || key === "bookID") {
        acc[key] = payload.updatedData[key];
      }
      return acc;
    }, {});
    console.log("Form Submitted",payload);
    toast.success('Successfully Updated Book Info!', {
      position: 'top-right',
      autoClose: 3000,
    })

    updateBookByID(filteredData)
      .then((data) => {       
        dispatch(updateBookInfo(data));
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  return (
    <div >
      <h1>Update Information</h1>
{loading==true && <h2>Loading...</h2>}
      <form className="form-container" onSubmit={handleUpdate}>
        {/* <p>Enter the ID</p>
        <input
          type="text"
          name="bookID"
          label="bookID"
          placeholder="input book ID"
          className="custom-input"
          onChange={handleInputChange}
   
        />
        <p>Enter title</p>
        <input
          type="text"
          name="title"
          label="title"
          placeholder="input title"
          className="custom-input"
          onChange={handleInputChange}
   
        /> */}
        <p>Enter Author</p>
        <input
          type="text"
          name="author"
          label="author"
          placeholder="input author name"
          className="custom-input"
          onChange={handleInputChange}
   
        />
        <p>Enter Genre</p>
        <input
          type="text"
          name="genre"
          label="genre"
          placeholder="input genre"
          className="custom-input"
          onChange={handleInputChange}
        />
        <p>Enter Price</p>
        <input
          type="text"
          name="price"
          label="price"
          placeholder="input price"
          className="custom-input"
          onChange={handleInputChange}
        />
        <p>Enter Stock</p>
        <input
          type="text"
          name="stock"
          label="stock"
          placeholder="Input Stock"
          className="custom-input"
          onChange={handleInputChange}
        />
        <p>Enter language</p>
        <input
          type="text"
          name="language"
          label="language"
          placeholder="Input language"
          className="custom-input"
          onChange={handleInputChange}
        />
        <p>Enter PageCount</p>
        <input
          type="text"
          name="pageCount"
          label="pageCount"
          placeholder="Input Page Count"
          className="custom-input"
          onChange={handleInputChange}
        />
        <p>Enter Availability</p>
        <input
          type="text"
          name="availability"
          label="availability"
          placeholder="Input availability"
          className="custom-input"
          onChange={handleInputChange}
        />
        <p>Enter bestseller</p>
        <input
          type="text"
          name="bestseller"
          label="bestseller"
          placeholder="Input bestseller"
          className="custom-input"
          onChange={handleInputChange}
        />
        <button type="submit" className="custom-btn custom-btn-success">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateBook;