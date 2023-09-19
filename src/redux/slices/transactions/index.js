import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tableNames } from '../../../constants/constant';
import SQLite from '../../../sqlite/sql';
import moment from 'moment';
const initialState = {
  isLoading: false,
  transactionAdded: false,
  transactionList: [],
  bankAmount: 0,
  cashAmount: 0,
  incomeBal: 0,
  expenseBal: 0,
};

export const updateUserAmount = createAsyncThunk(
  'updateUserAmount',
  async (newObj, { rejectWithValue }) => {
    // write logic to add amount in userdb
    // and return the payload
    try {
      const updatedRows = await SQLite.updateUserDetails(tableNames.USER_TABLE, newObj);
      if (updatedRows.status) {
        // update the redux state also
        return newObj;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getUserTransactions = createAsyncThunk(
  'getUserTransactions',
  async (userId, { rejectWithValue }) => {
    try {
      SQLite.checkAndCreateUserTable(tableNames.USER_TABLE, userId);
      const transactionList = await SQLite.getTableData(tableNames.TRANSACTION_TABLE, userId);
      // write logic to take all income and expense transactions by month and return values
      const currMonth = moment().format('MM');
      let income = 0;
      let expense = 0;
      transactionList.length > 0 &&
        transactionList.map(item => {
          const month = moment(item.date).format('MM');
          if (month === currMonth) {
            if (item.isExpense === 0) {
              income += Number(item.amount);
            } else if (item.isExpense === 1) {
              expense += Number(item.amount);
            }
          }
        });
      return { transactionList, income, expense };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const AddOneTrasaction = createAsyncThunk(
  'AddOneTrasaction',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('userData => ', userData);
      const response = await SQLite.insertData(userData);
      console.log('response, => ', response);
      if (response == 1) {
        // write logic to find transaction -/+ and the medium => bank/cash
        //  update the db and state accordingly

        // add data in newObj according to the logic
        const newObj = {
          userId: userData.userId,
        };
        if (userData.isExpense) {
          newObj['expenseBal'] = Number(userData.expenseBal) + Number(userData.amount);
          if (userData.paymentMode === 'Cash') {
            newObj['cashAmount'] = userData.cashAmount - userData.amount;
          } else {
            newObj['bankAmount'] = userData.bankAmount - userData.amount;
          }
        } else {
          newObj['incomeBal'] = Number(userData.incomeBal) + Number(userData.amount);
          if (userData.paymentMode === 'Cash') {
            newObj['cashAmount'] = Number(userData.cashAmount) + Number(userData.amount);
          } else {
            newObj['bankAmount'] = Number(userData.bankAmount) + Number(userData.amount);
          }
        }
        const updatedRows = await SQLite.updateUserDetails(tableNames.USER_TABLE, newObj);
        console.log('data => ', updatedRows);
        console.log('newObj => ', newObj);
        return { userData, newObj };
      } else return false;
      // return await SQLite.getTableData(tableNames.TRANSACTION_TABLE, userId);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

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
    resetTransactionAdded: state => {
      state.transactionAdded = false;
    },
  },
  extraReducers: {
    [getUserTransactions.pending]: state => {
      state.isLoading = true;
    },
    [getUserTransactions.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (!action.payload.message) {
        state.transactionList = [...action.payload.transactionList];
        state.incomeBal = action.payload.income;
        state.expenseBal = action.payload.expense;
      }
    },
    [getUserTransactions.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [AddOneTrasaction.pending]: state => {
      state.isLoading = true;
    },
    [AddOneTrasaction.fulfilled]: (state, action) => {
      state.isLoading = false;
      const { userData, newObj } = action.payload;
      if (action.payload) {
        state.transactionList.push(userData);
        state.transactionAdded = true;
        if (newObj.bankAmount) {
          state.bankAmount = newObj.bankAmount;
        } else {
          state.cashAmount = newObj.cashAmount;
        }
        if (newObj.incomeBal) {
          state.incomeBal = newObj.incomeBal;
        } else {
          state.expenseBal = newObj.expenseBal;
        }
      }
    },
    [AddOneTrasaction.rejected]: (state, action) => {
      state.isLoading = false;
      state.transactionAdded = false;
      state.error = action.payload;
    },
    [updateUserAmount.pending]: state => {
      state.isLoading = true;
    },
    [updateUserAmount.fulfilled]: (state, action) => {
      const { bankAmount, cashAmount } = action.payload;
      state.isLoading = false;
      state.transactionAdded = true;
      if (bankAmount) {
        state.bankAmount = bankAmount;
      }
      if (cashAmount) {
        state.cashAmount = cashAmount;
      }
    },
    [updateUserAmount.rejected]: (state, action) => {
      state.isLoading = false;
      state.transactionAdded = false;
    },
  },
});

export const { updateTransactions, resetTransactionAdded } = transactionDetailsSlice.actions;

export default transactionDetailsSlice.reducer;
