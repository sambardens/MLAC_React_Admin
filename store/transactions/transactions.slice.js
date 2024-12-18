import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: null,
  transactionDetail: null,
  filteredData: [],
  uniqueFields: null,
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setTransactionDetail: (state, action) => {
      state.transactionDetail = action.payload;
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
    setUniqueFields: (state, action) => {
      state.uniqueFields = action.payload;
    },
  },
});

export default transactionsSlice.reducer;
