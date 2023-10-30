import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import useBooksHook from "../../../hooks/useBooksHook";
import {useDispatch} from 'react-redux';
import { addBooks } from "../../../source/slices/booksSlice";
//import './Demo_form.scss'
const AddBookform = () => {
    const { createPost } = useBooksHook();
    const dispatch =useDispatch();
    
    const {
      handleSubmit,
      control,
      formState: { errors }
  } = useForm();

  const handlerOnSubmit = (data) => {
    console.log("Form Data:", data);
    createPost(data);
    dispatch(addBooks(data))
  };

  useEffect(() => {
    console.log("Errors: ", errors);
  }, [errors]);

  return (
    <div>
      <h1>Add Books</h1>
      <form className="form-container" onSubmit={handleSubmit(handlerOnSubmit)}>
        <div>
          <p>Enter title</p>
          <Controller
            name="title"
            control={control}
            rules={{
              required: "Title is required",
              minLength: {
                value: 6,
                message: "Minimum length must be 6",
              },
              maxLength: {
                value: 30,
                message: "Maximum length must be 30",
              },
            }}
            render={({ field }) => (
              <input
                type="text"
                label="title"
                placeholder="Enter Title"
                className="custom-input"
                {...field}
                style={{ border: errors.title ? "1px solid red" : "" }}
              />
            )}
          />
          {errors.title && <h5>{errors.title.message}</h5>}
        </div>

        <div>
          <p>Enter Author</p>
          <Controller
            name="author"
            control={control}
            rules={{
              required: "Author name is required",
              minLength: {
                value: 6,
                message: "Minimum length must be 6",
              },
              maxLength: {
                value: 20,
                message: "Minimum length must be 20",
              },
            }}
            render={({ field }) => (
              <input
                type="text"
                label="author"
                placeholder="Input Author's name"
                className="custom-input"
                {...field}
                style={{ border: errors.author ? "2px solid red" : "" }}
              />
            )}
          />
          {errors.author && <h5>{errors.author.message}</h5>}
        </div>
        <div>
          <p>Enter ISBN</p>
          <Controller
            name="ISBN"
            control={control}
            rules={{
              required: "ISBN is required",
              minLength: {
                value: 6,
                message: "Minimum length must be 6",
              },
              maxLength: {
                value: 15,
                message: "Minimum length must be 15",
              },
            }}
            render={({ field }) => (
              <input
                type="text"
                label="ISBN"
                placeholder="input ISBN"
                className="custom-input"
                {...field}
                style={{ border: errors.ISBN ? "2px solid red" : "" }}
              />
            )}
          />
          {errors.ISBN && <h5>{errors.ISBN.message}</h5>}
        </div>
        <div>
          <p>Enter Genre</p>
          <Controller
            name="genre"
            control={control}
            rules={{
              required: "Genre is required",
              minLength: {
                value: 5,
                message: "Minimum length must be 5",
              },
              maxLength: {
                value: 20,
                message: "Minimum length must be 20",
              },
            }}
            render={({ field }) => (
              <input
                type="text"
                label="genre"
                placeholder="input genre"
                className="custom-input"
                {...field}
                style={{ border: errors.genre ? "2px solid red" : "" }}
              />
            )}
          />
          {errors.genre && <h5>{errors.genre.message}</h5>}
        </div>
        <div>
          <p>Enter Price</p>
          <Controller
            name="price"
            control={control}
            rules={{
              required: "Price is required",
            }}
            render={({ field }) => (
              <input
                type="text"
                label="price"
                placeholder="Input price"
                className="custom-input"
                {...field}
                style={{ border: errors.price ? "2px solid red" : "" }}
              />
            )}
          />
          {errors.price && <h5>{errors.price.message}</h5>}
        </div>

        <div>
          <p>Enter Stock</p>
          <Controller
            name="stock"
            control={control}
            rules={{
              required: "Stock is required",
            }}
            render={({ field }) => (
              <input
                type="text"
                label="stock"
                placeholder="Input Stock"
                className="custom-input"
                {...field}
                style={{ border: errors.stock ? "2px solid red" : "" }}
              />
            )}
          />
          {errors.stock && <h5>{errors.stock.message}</h5>}
        </div>

        <div>
          <p>Enter language</p>
          <Controller
            name="language"
            control={control}
            rules={{
              required: "Language is required",
            }}
            render={({ field }) => (
              <input
                type="text"
                label="language"
                placeholder="Input language"
                className="custom-input"
                {...field}
                style={{ border: errors.language ? "2px solid red" : "" }}
              />
            )}
          />
          {errors.language && <h5>{errors.language.message}</h5>}
        </div>

        <div>
          <p>Enter PageCount</p>
          <Controller
            name="pageCount"
            control={control}
            rules={{
              required: "PageCount is required",
            }}
            render={({ field }) => (
              <input
                type="text"
                label="pageCount"
                placeholder="Input Count"
                className="custom-input"
                {...field}
                style={{ border: errors.pageCount ? "2px solid red" : "" }}
              />
            )}
          />
          {errors.pageCount && <h5>{errors.pageCount.message}</h5>}
        </div>

        <div>
          <p>Enter Availability</p>
          <Controller
            name="availability"
            control={control}
            rules={{
              required: "Availability is required",
            }}
            render={({ field }) => (
              <input
                type="text"
                label="availability"
                placeholder="Input availability"
                className="custom-input"
                {...field}
                style={{ border: errors.availability ? "2px solid red" : "" }}
              />
            )}
          />
          {errors.availability && <h5>{errors.availability.message}</h5>}
        </div>

        <div>
          <p>Enter bestseller</p>
          <Controller
            name="bestseller"
            control={control}
            rules={{
              required: "Bestseller is required",
            }}
            render={({ field }) => (
              <input
                type="text"
                label="bestseller"
                placeholder="Input bestseller"
                className="custom-input"
                {...field}
                style={{ border: errors.bestseller ? "2px solid red" : "" }}
              />
            )}
          />
          {errors.bestseller && <h5>{errors.bestseller.message}</h5>}
        </div>

        <button type="submit" className="custom-btn custom-btn-success">
          Create
        </button>
      </form>
    </div>
  );
};

export default AddBookform;
