import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	orders: null,
	orderReleases: null,
	isLoading: false,
};

export const downloadsSlice = createSlice({
	name: 'downloads',
	initialState,
	reducers: {
		setIsLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		setOrders: (state, action) => {
			state.orders = action.payload;
		},
		setOrderReleases: (state, action) => {
			state.orderReleases = action.payload;
		},
		resetDownloadsState: () => initialState,
	},
});

export default downloadsSlice.reducer;
