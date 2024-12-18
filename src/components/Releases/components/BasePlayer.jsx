import { useEffect, useRef, useState } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useSelector } from 'react-redux';
import { audioSelectors } from 'store/audio';

// import LoopIcon from '@/assets/icons/downloads/loop.svg';
// import NextTrackIcon from '@/assets/icons/downloads/next_track.svg';
import PauseIcon from '@/assets/icons/downloads/pause.svg';
import PlayIcon from '@/assets/icons/downloads/play.svg';

// import PrevTrackIcon from '@/assets/icons/downloads/prev_track.svg';

const BasePlayer = ({ itemTrack, handlePlay }) => {
  const URL_SRC_TRACK =
    'https://api-major-labl.pixy.pro/api/tracks/listen/mp3/';
  const audioPlayer = useRef();
  const [isTrackLoaded, setIsTrackLoaded] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);
  const currentTrack = useSelector(audioSelectors.getCurrentTrack);

  const onPause = () => {
    audioPlayer?.current?.audio?.current.pause();
  };

  const onPlay = () => {
    audioPlayer?.current?.audio?.current.play();
  };

  useEffect(() => {
    if (currentTrack?.id === itemTrack.id && isTrackLoaded) {
      onPlay();
    } else {
      onPause();
    }
  }, [currentTrack?.id, isTrackLoaded]);

  const handleLoadedMetaData = () => {
    setIsTrackLoaded(true);
  };

  const handleTrackEnd = () => {
    audioPlayer.current.audio.current.currentTime = 0;
    onPause();
    setForceUpdate(prevState => !prevState);
  };

  return (
    <AudioPlayer
      key={forceUpdate}
      layout="horizontal-reverse"
      onPlayError={error => console.log(error)}
      onLoadedMetaData={handleLoadedMetaData}
      onPlay={() => {
        handlePlay(itemTrack);
      }}
      onPause={onPause}
      onEnded={handleTrackEnd}
      ref={audioPlayer}
      src={`${URL_SRC_TRACK + itemTrack?.uniqueName}`}
      preload="metadata"
      showSkipControls={false}
      showJumpControls={false}
      showDownloadProgress={false}
      style={{
        backgroundColor: 'transparent',
        width: '100%',
        height: '18px',
        padding: '0px',
        borderColor: 'transparent',
      }}
      customIcons={{
        play: <PlayIcon />,
        pause: <PauseIcon />,
      }}
      customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
      customProgressBarSection={[
        RHAP_UI.PROGRESS_BAR,
        RHAP_UI.CURRENT_TIME,

        <div key="line" style={{ color: '#909090', fontSize: '12px' }}>
          /
        </div>,
        RHAP_UI.DURATION,
      ]}
      volume={0.5}
    />
  );
};

export default BasePlayer;
