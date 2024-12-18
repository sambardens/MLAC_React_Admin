import store from '..';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

import { axiosService } from '../api_service/axios_service';

export const getFullAudioTrack = async track => {
  const { getState } = store;

  try {
    const { data } = await axiosService.get(
      `/api/tracks/admin/download?trackId=${track.id}`,
      {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    if (data?.success === false) return;
    return { file: data, name: track.name, success: true };
  } catch (error) {
    console.log('downLoadTrack error: ', error);
  }
};

export const downloadOneTrack = async trackData => {
  const track = await getFullAudioTrack(trackData);
  if (track?.success && track?.file && track?.name) {
    const blob = new Blob([track.file], { type: 'audio/mpeg' });
    const url = window.URL.createObjectURL(blob);
    let fileName = track.name;
    if (!fileName.endsWith('.mp3')) {
      fileName += '.mp3';
    }
    saveAs(url, fileName);
    return { success: true };
  }
};

export const downloadListOfTracks = async tracks => {
  const zip = new JSZip();
  const downloadedTracks = await Promise.all(
    tracks.map(async track => await getFullAudioTrack(track)),
  );
  if (downloadedTracks.length >= 1) {
    downloadedTracks.forEach(track => {
      if (track?.success && track?.file && track?.name) {
        const blob = new Blob([track.file], { type: 'audio/mpeg' });
        let fileName = track.name;
        if (!fileName.endsWith('.mp3')) {
          fileName += '.mp3';
        }
        zip.file(fileName, blob);
      }
    });
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, 'tracks.zip');
    return { success: true };
  }
};
