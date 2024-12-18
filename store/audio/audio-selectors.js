const getCurrentTrack = state => state.audio.currentTrack;
const gatCurrentPlaylist = state => state.audio.currentPlaylist;
const getPlayMode = state => state.audio.playMode;
const getIsPlaying = state => state.audio.isPlayingSingleTrack;
const getIsPlayAllTracks = state => state.audio.isPlayAllTracks;

const audioSelectors = {
  getCurrentTrack,
  gatCurrentPlaylist,
  getPlayMode,
  getIsPlaying,
  getIsPlayAllTracks,
};

export default audioSelectors;
