import React, { useState } from "react";
import useBooksHook from "../../../hooks/useBooksHook"
// import {useDispatch} from 'react-redux';
// import { addBooks } from "../../../source/slices/booksSlice";
const AddBooks = () => {
  // const dispatch =useDispatch()
  const { createPost } = useBooksHook();

  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [ISBN, setISBN] = useState("");
  const [bookGenre, setBookGenre] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookStock,setBookStock]=useState("");
  const [bookPageCount, setBookPageCount] = useState("");
  const [language,setLanguage] =useState("");
  const[availability,setAvailability] =useState("");
  const [bestseller,setBestseller] =useState("");
  
  
  
  const handleCreateProduct = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    const data = {
      title: bookTitle,
      author: bookAuthor,
      ISBN: ISBN,
      genre: bookGenre,
      price: bookPrice,
      stock:bookStock,
      pageCount: bookPageCount,
      language:language,
      availability:availability,
      bestseller:bestseller
    };

    createPost(data);
    //dispatch(addBooks(data))
  };

  return (
    <div >
      <h1>Add Books</h1>

      <form className="form-container" onSubmit={handleCreateProduct}>
        <p>Enter title</p>
        <input
          type="text"
          label="title"
          placeholder="input title"
          className="custom-input"
          onChange={(e) =>{{
             
            console.log(e.target.value);
            setBookTitle(e.target.value)
          }}
        }
        />
        <p>Enter Author</p>
        <input
          type="text"
          label="author"
          placeholder="input author name"
          className="custom-input"
          onChange={(e) => {
             
            console.log(e.target.value);
            setBookAuthor(e.target.value)
          }}
        />
        <p>Enter ISBN</p>
        <input
          type="text"
          label="ISBN"
          placeholder="input ISBN"
          className="custom-input"
          onChange={(e) => setISBN(e.target.value)}
        />
        <p>Enter Genre</p>
        <input
          type="text"
          label="genre"
          placeholder="input genre"
          className="custom-input"
          onChange={(e) => setBookGenre(e.target.value)}
        />
        <p>Enter Price</p>
        <input
          type="text"
          label="Price"
          placeholder="input price"
          className="custom-input"
          onChange={(e) => setBookPrice(e.target.value)}
        />
        <p>Enter Stock</p>
        <input
          type="text"
          label="stock"
          placeholder="input Stock"
          className="custom-input"
          onChange={(e) => setBookStock(e.target.value)}
        />
        <p>Enter language</p>
        <input
          type="text"
          label="language"
          placeholder="input language"
          className="custom-input"
          onChange={(e) => setLanguage(e.target.value)}
        />
        <p>Enter PageCount</p>
        <input
          type="text"
          label="pageCount"
          placeholder="input Count"
          className="custom-input"
          onChange={(e) => setBookPageCount(e.target.value)}
        />
        <p>Enter Availability</p>
        <input
          type="text"
          label="availability"
          placeholder="input availability"
          className="custom-input"
          onChange={(e) => setAvailability(e.target.value)}
        />
        <p>Enter bestseller</p>
        <input
          type="text"
          label="bestseller"
          placeholder="input bestseller"
          className="custom-input"
          onChange={(e) => setBestseller(e.target.value)}
        />
        <button type="submit" className="custom-btn custom-btn-success">Create</button>
      </form>
    </div>
  );
};

export default AddBooks;
