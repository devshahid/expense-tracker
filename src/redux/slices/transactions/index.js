import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tableNames } from '../../../constants/constant';
import SQLite from '../../../sqlite/sql';
import moment from 'moment';
import { checkPaymentMode } from '../../../constants/data';
const initialState = {
  isLoading: false,
  message: null,
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
      const transactionList = await SQLite.getTableData(tableNames.TRANSACTION_TABLE, userId);
      const [{ bankAmount, cashAmount }] = await SQLite.getTableData(tableNames.USER_TABLE, userId);
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
      return {
        transactionList,
        income,
        expense,
        bankAmount: bankAmount ?? 0,
        cashAmount: cashAmount ?? 0,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const AddOneTrasaction = createAsyncThunk(
  'AddOneTrasaction',
  async (userData, { rejectWithValue }) => {
    try {
      const {
        userId,
        isExpense,
        incomeBal,
        expenseBal,
        amount,
        cashAmount,
        bankAmount,
        paymentMode,
      } = userData;
      const cashCondition = paymentMode === 'Cash' && cashAmount > 0;
      const bankCondition =
        checkPaymentMode(paymentMode).value !== ('Cash' || undefined) && bankAmount > 0;

      if ((isExpense && (cashCondition || bankCondition)) || !isExpense) {
        // condition when (debit and amount > 0) or credit
        const response = await SQLite.insertData(userData);
        if (response == 1) {
          const newObj = {
            userId: userId,
          };
          if (isExpense) {
            newObj['expenseBal'] = Number(expenseBal) + Number(amount);
            if (paymentMode === 'Cash') {
              newObj['cashAmount'] = cashAmount - amount;
            } else {
              newObj['bankAmount'] = bankAmount - amount;
            }
          } else {
            newObj['incomeBal'] = Number(incomeBal) + Number(amount);
            if (paymentMode === 'Cash') {
              newObj['cashAmount'] = Number(cashAmount) + Number(amount);
            } else {
              newObj['bankAmount'] = Number(bankAmount) + Number(amount);
            }
          }
          const { status } = await SQLite.updateUserDetails(tableNames.USER_TABLE, newObj);
          if (status) {
            return { userData, newObj, status: true };
          } else {
            return { status: false, message: 'Something went wrong, while updating' };
          }
        } else
          return { status: false, message: 'Something went wrong while adding main transaction' };
      } else
        return {
          status: false,
          message: 'Please add amount from profile section! Then try to add the transaction',
        };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const transactionDetailsSlice = createSlice({
  name: 'transactionDetails',
  initialState,
  reducers: {
    resetTransactionAdded: state => {
      state.transactionAdded = false;
      state.message = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserTransactions.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getUserTransactions.fulfilled, (state, action) => {
      state.isLoading = false;
      if (!action.payload.message) {
        state.transactionList = [...action.payload.transactionList];
        state.incomeBal = action.payload.income;
        state.expenseBal = action.payload.expense;
        state.bankAmount = action.payload.bankAmount;
        state.cashAmount = action.payload.cashAmount;
      }
    });
    builder.addCase(getUserTransactions.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(AddOneTrasaction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(AddOneTrasaction.fulfilled, (state, action) => {
      state.isLoading = false;
      const { userData, newObj } = action.payload;
      if (action.payload.status) {
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
      } else {
        state.message = action.payload.message;
      }
    });
    builder.addCase(AddOneTrasaction.rejected, (state, action) => {
      console.log('action.payload => ', action.payload);
      state.isLoading = false;
      state.transactionAdded = false;
      state.error = action.payload;
    });
    builder.addCase(updateUserAmount.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(updateUserAmount.fulfilled, (state, action) => {
      const { bankAmount, cashAmount } = action.payload;
      state.isLoading = false;
      state.transactionAdded = true;
      if (bankAmount) {
        state.bankAmount = bankAmount;
      }
      if (cashAmount) {
        state.cashAmount = cashAmount;
      }
    });
    builder.addCase(updateUserAmount.rejected, (state, action) => {
      state.isLoading = false;
      state.transactionAdded = false;
    });
  },
});

export const { resetTransactionAdded } = transactionDetailsSlice.actions;

export default transactionDetailsSlice.reducer;
