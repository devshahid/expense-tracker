import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  transactionList: [],
};

export const transactionDetailsSlice = createSlice({
  name: 'transactionDetails',
  initialState,
  reducers: {
    updateTransactions: (state, action) => {
      return {
        ...state,
        transactionList: [...action.payload],
      };
    },
  },
});

export const { updateTransactions } = transactionDetailsSlice.actions;

export default transactionDetailsSlice.reducer;
