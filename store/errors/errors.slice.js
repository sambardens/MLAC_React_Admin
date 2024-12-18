import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errorData: null,
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    loadError: (state, action) => {
      state.errorData = action.payload;
    },
    clearError: state => {
      state.errorData = null;
    },
  },
});

// export const errorActions = errorSlice.actions;

export default errorSlice.reducer;
