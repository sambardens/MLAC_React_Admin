import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  releases: null,
  itemRelease: null,
  uniqueReleasesFields: null,
};

export const releasesSlice = createSlice({
  name: 'releases',
  initialState,
  reducers: {
    setReleases: (state, action) => {
      state.releases = action.payload;
    },
    setItemRelease: (state, action) => {
      state.itemRelease = action.payload;
    },
    setUniqueReleasesFields: (state, action) => {
      state.uniqueReleasesFields = action.payload;
    },
  },
});

export default releasesSlice.reducer;
