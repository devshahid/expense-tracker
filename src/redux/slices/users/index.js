import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  token: null,
  userId: null,
  bankAmount: 0,
  cashAmount: 0,
  incomeBal: 50,
  expenseBal: 90,
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
      return {
        ...state,
        ...action.payload,
      };
    },
    updateIncomeAndExpense: (state, action) => {
      const { expense, income } = action.payload;
      console.log('action.payload => ', action.payload);
      return {
        ...state,
        incomeBal: income,
        expenseBal: expense,
      };
    },
  },
});

export const { updateUserTokenAndId, updateAmountDetails, updateIncomeAndExpense } =
  userDetailSlice.actions;

export default userDetailSlice.reducer;
