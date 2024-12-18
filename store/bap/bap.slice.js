import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  baps: null,
  usersOfBap: null,
  releasesOfBap: null,
};

export const bapsSlice = createSlice({
  name: 'baps',
  initialState,
  reducers: {
    setBaps: (state, action) => {
      state.baps = action.payload;
    },
    setUsersOfBap: (state, action) => {
      state.usersOfBap = action.payload;
    },
    setReleasesOfBap: (state, action) => {
      state.releasesOfBap = action.payload;
    },
  },
});

export default bapsSlice.reducer;
