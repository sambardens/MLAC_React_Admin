import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortBy: null,
  selectedReleaseType: null,
  selectedPerformer: null,
  selectedGenre: null,
  selectedSubGenre: null,
  selectedBuyer: null,
  selectedRole: null,
  selectedBap: null,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSelectedReleaseType: (state, action) => {
      state.selectedReleaseType = action.payload;
    },
    setSelectedPerformer: (state, action) => {
      state.selectedPerformer = action.payload;
    },
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
    setSelectedSubGenre: (state, action) => {
      state.selectedSubGenre = action.payload;
    },
    setSelectedBuyer: (state, action) => {
      state.selectedBuyer = action.payload;
    },
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
    setSelectedBap: (state, action) => {
      state.selectedBap = action.payload;
    },
  },
});

export default filtersSlice.reducer;
