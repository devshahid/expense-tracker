import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from '../../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tableNames } from '../../../constants/constant';
import SQLite from '../../../sqlite/sql';
const initialState = {
  userName: null,
  token: null,
  userId: null,
  isLoading: false,
  error: null,
  message: null,
};

export const userLogin = createAsyncThunk('userLogin', async (userDetails, { rejectWithValue }) => {
  try {
    const response = await client.post('/api/user/login', userDetails);
    const { token, message, userId } = response.data;
    SQLite.checkAndCreateUserTable(tableNames.USER_TABLE, { userId, userName: userDetails.name });
    await AsyncStorage.setItem(
      'userData',
      JSON.stringify({ token, userId, userName: userDetails.name }),
    );
    return {
      token,
      message,
      userId,
      userName: userDetails.name,
    };
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const userRegister = createAsyncThunk(
  'userRegister',
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await client.post('/api/user/sign-up', userDetails);
      const { userData, status, message } = response.data;
      console.log(response.data);
      if (response.status === 201 && status && userData._id) {
        return message;
      }
      return false;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const userLogout = createAsyncThunk('userLogout', async (args, { rejectWithValue }) => {
  try {
    await AsyncStorage.removeItem('userData');
    return true;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const userDetailSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    updateUserTokenAndId: (state, action) => {
      if (action.payload) {
        const { token, userId, userName } = action.payload;
        state.token = token;
        state.userId = userId;
        state.userName = userName;
      }
    },
    resetUserDetails: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(userLogin.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.message = action.payload.message;
      state.userName = action.payload.userName;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(userLogout.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(userLogout.fulfilled, state => {
      state.isLoading = false;
      state.token = null;
      state.userId = null;
      state.message = null;
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(userRegister.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      if (action.payload) {
        state.message = action.payload.message;
      } else {
        state.error = action.payload;
      }
    });
    builder.addCase(userRegister.rejected, state => {});
  },
});

export const { updateUserTokenAndId, resetUserDetails } = userDetailSlice.actions;

export default userDetailSlice.reducer;
