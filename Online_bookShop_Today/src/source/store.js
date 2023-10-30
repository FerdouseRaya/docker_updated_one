import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slices/booksSlice";
import authReducer from "./slices/authenticationSlice";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import reviewReducer from "./slices/reviewsSlice";
import transactionReducer from "./slices/transactionSlice";
const store = configureStore({
  reducer: {
    books: booksReducer,
    auth: authReducer,
    cart: cartReducer,
    users: userReducer,
    review: reviewReducer,
    transactions: transactionReducer,
  },
});

export default store;
