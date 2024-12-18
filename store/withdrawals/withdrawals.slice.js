import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  withdrawals: null,
};

export const withdrawalsSlice = createSlice({
  name: 'withdrawals',
  initialState,
  reducers: {
    setWithdrawals: (state, action) => {
      state.withdrawals = action.payload;
    },
  },
});

export default withdrawalsSlice.reducer;
