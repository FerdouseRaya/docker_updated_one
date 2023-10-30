import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    fetchTransaction: (state, action) => {
      state.transactions = action.payload;
    },
  },
});
export const { fetchTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
