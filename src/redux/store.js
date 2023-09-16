import { configureStore } from '@reduxjs/toolkit';
import userDetailSlice from './slices/users';
import transactionDetailsSlice from './slices/transactions';
const store = configureStore({
  reducer: {
    userDetails: userDetailSlice,
    transactions: transactionDetailsSlice,
  },
});

export default store;
