import { configureStore } from '@reduxjs/toolkit';
import userDetailSlice from './slices/users';
const store = configureStore({
  reducer: {
    userDetails: userDetailSlice,
  },
});

export default store;
