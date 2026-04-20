import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { FilmType } from '../../types/film';

type VideoPlayerProps = {
  film: FilmType | null;
};

const formatPlayerTime = (seconds: number): string => {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const secs = safeSeconds % 60;

  const hh = String(hours).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');
  const ss = String(secs).padStart(2, '0');

  return hours > 0 ? `-${hh}:${mm}:${ss}` : `-${mm}:${ss}`;
};

function VideoPlayer({ film }: VideoPlayerProps): JSX.Element | null {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const progressPercent = useMemo(() => {
    if (!duration) {
      return 0;
    }

    return (currentTime / duration) * 100;
  }, [currentTime, duration]);

  const handlePlayToggle = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      return;
    }

    video.pause();
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    setCurrentTime(video.currentTime);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    setDuration(video.duration || 0);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  const handleFullScreen = () => {
    const video = videoRef.current;

    if (video && video.requestFullscreen) {
      void video.requestFullscreen();
    }
  };

  const handleExitClick = () => {
    const video = videoRef.current;

    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    navigate(-1);
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setIsPlaying(false);
      });
    }
  }, [film?.id]);

  return film ? (
    <div className="player">
      <video
        ref={videoRef}
        src={film.src}
        className="player__video"
        poster={film.backgroundImage}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleVideoEnded}
      >
      </video>

      <button type="button" className="player__exit" onClick={handleExitClick}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progressPercent} max="100"></progress>
            <div className="player__toggler" style={{ left: `${progressPercent}%` }}>Toggler</div>
          </div>
          <div className="player__time-value">{formatPlayerTime(duration - currentTime)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handlePlayToggle}>
            <svg viewBox={isPlaying ? '0 0 14 21' : '0 0 19 19'} width="19" height="19">
              <use xlinkHref={isPlaying ? '#pause' : '#play-s'}></use>
            </svg>
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <div className="player__name">{film.title}</div>

          <button type="button" className="player__full-screen" onClick={handleFullScreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default VideoPlayer;
