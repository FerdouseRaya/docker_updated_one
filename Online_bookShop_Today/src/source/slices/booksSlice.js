import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
};

const Slice = createSlice({
  name: "books",
  initialState,
  reducers: {
    getBooks: (state, action) => {
      state.books = action.payload;
    },
    addBooks: (state, action) => {
      state.books.push({
        books: action.payload,
      });
    },
    updateBookInfo: (state, action) => {
      const updatedBook = action.payload;
      const updatedIndex = state.books.findIndex(
        (book) => book._id === updatedBook._id
      );

      if (updatedIndex !== -1) {
        const updatedBooks = [...state.books]; // Create a shallow copy of the books array
        updatedBooks[updatedIndex] = updatedBook; // Update the specific book in the copied array
        state.books = updatedBooks; // Update the state with the new array
      }
    },
    deleteByID: (state, action) => {
      const bookIdToDelete = action.payload;
      const updatedBooks = state.books.filter(
        (book) => book._id !== bookIdToDelete
      );
      state.books = updatedBooks;
    },
  },
});
export const { getBooks, addBooks, updateBookInfo, deleteByID } = Slice.actions;
export default Slice.reducer;
