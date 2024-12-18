import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentTrack: null,
	currentPlaylist: [],
	playMode: '',
	isPlayingSingleTrack: false,
	isPlayAllTracks: false,
};

export const audioSlice = createSlice({
	name: 'audio',
	initialState,
	reducers: {
		setCurrentTrack: (state, action) => {
			state.currentTrack = action.payload;
		},
		startPlayback: state => {
			state.isPlayingSingleTrack = true;
		},
		pausePlayback: state => {
			state.isPlayingSingleTrack = false;
		},
		startPlayAllTracks: state => {
			state.isPlayAllTracks = true;
		},
		pausePausePlayAllTracks: state => {
			state.isPlayAllTracks = false;
		},
		setPlaylist: (state, action) => {
			state.currentPlaylist = action.payload;
		},
		setPlayMode: (state, action) => {
			state.playMode = action.payload;
		},
		resetAudio: () => initialState,
	},
});

export default audioSlice.reducer;
