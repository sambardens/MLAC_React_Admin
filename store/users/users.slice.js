import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: null,
  itemUser: null,
  uniqueFields: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setItemUser: (state, action) => {
      state.itemUser = action.payload;
    },
    setUniqueFields: (state, action) => {
      state.uniqueFields = action.payload;
    },
  },
});

export default usersSlice.reducer;
