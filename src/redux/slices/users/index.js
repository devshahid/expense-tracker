import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  token: null,
  userId: null,
  bankAmount: 0,
  cashAmount: 0,
};

export const userDetailSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    updateUserTokenAndId: (state, action) => {
      const { token, userId } = action.payload;
      return {
        ...state,
        token: token,
        userId: userId,
      };
    },
    updateAmountDetails: (state, action) => {
      const { bankAmount, cashAmount } = action.payload;
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateUserTokenAndId, updateAmountDetails } = userDetailSlice.actions;

export default userDetailSlice.reducer;
