import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import YouTube, { YouTubePlayer } from 'react-youtube';
import { TRootState } from 'store';
import { toggleVisiable } from 'store/player';

let videoElement: YouTubePlayer = null;

const VideoPlayer = () => {
  const { isPaused } = useSelector((store: TRootState) => store.player);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(toggleVisiable(true));
    }, 3000);
  }, [dispatch]);

  const opts = {
    width: '1280',
    height: '720',
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    if (videoElement) {
      if (isPaused) {
        videoElement.target.pauseVideo();
      } else {
        videoElement.target.playVideo();
      }
    }
  }, [isPaused]);

  // I didtn used this method becouse many browsers are blocked autoplay for video and banner not be will appear
  //get current time and video status in real time
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     if (videoElement && videoElement.target.getCurrentTime() > 0) {
  //       const elapsed_seconds = videoElement.target.getCurrentTime();

  //       // calculations
  //       const elapsed_milliseconds = Math.floor(elapsed_seconds * 1000);
  //       const min = Math.floor(elapsed_milliseconds / 60000);
  //       const seconds = Math.floor((elapsed_milliseconds - min * 60000) / 1000);

  //       if (seconds === 5) {
  //         dispatch(toggleVisiable(true));
  //       }
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  const _onReady = (event: YouTubePlayer) => {
    videoElement = event;
  };

  return <YouTube videoId={'RZK0Y3w24yw'} opts={opts} onReady={_onReady} />;
};

export default VideoPlayer;
