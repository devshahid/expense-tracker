import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  token: null,
  userId: null,
};

export const userDetailSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    updateUserTokenAndId: (state, action) => {
      const { token, userId } = action.payload;
      console.log('action => ', token, userId);
      return {
        ...state,
        token: token,
        userId: userId,
      };
    },
    deleteToken: state => {},
  },
});

export const { updateUserTokenAndId, deleteToken } = userDetailSlice.actions;

export default userDetailSlice.reducer;
