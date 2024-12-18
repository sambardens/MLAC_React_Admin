import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentRelease: null,
  currentUser: null,
  currentBap: null,
  currentTab: 1,
};

export const currentSlice = createSlice({
  name: 'currentRelease',
  initialState,
  reducers: {
    setCurrentRelease: (state, action) => {
      state.currentRelease = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setCurrentBap: (state, action) => {
      state.currentBap = action.payload;
    },
    resetCurrent: () => initialState,
  },
});

export default currentSlice.reducer;
