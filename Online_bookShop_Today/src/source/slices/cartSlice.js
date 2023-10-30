import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { quantity, price } = action.payload;
      state.cartItems = [...state.cartItems, action.payload];
      state.cartTotalQuantity += quantity;
      state.cartTotalAmount += quantity * price;
    },
    getCart: (state, action) => {
      state.cartItems = action.payload;
    },
    clearCart: (state) => {
      // Clear the entire cart
      state.cartItems = [];
      state.total = 0;
    },
  },
});
export const { addToCart, getCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
