import { useState, useRef, useEffect } from 'react';

type VideoPlayerProps = {
  playerIndex: number;
  previewSrc: string;
  poster: string;
  width?: number;
  height?: number;
  isPlaying: boolean;
  onMouseEnter: (id: number) => void;
  onMouseLeave: () => void;
}

function PreviewPlayer({ playerIndex, previewSrc, poster, isPlaying, onMouseEnter, onMouseLeave, ...props }: VideoPlayerProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const handleMouseEnter = () => {
    onMouseEnter(playerIndex);
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const onLoadedData = () => setIsLoading(false);
    video.addEventListener('loadeddata', onLoadedData);

    return () => {
      video.removeEventListener('loadeddata', onLoadedData);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (!isLoading && isPlaying) {
      video.play();
      return;
    }

    video.pause();
    video.currentTime = 0;
    if (typeof video.load === 'function') {
      try {
        video.load();
      } catch {
        // jsdom не реализует загрузку media-элементов.
      }
    }
  }, [isPlaying, isLoading]);

  return (
    <video
      ref={videoRef}
      width={props.width}
      height={props.height}
      poster={poster}
      autoPlay={isPlaying}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      muted
    >
      <source src={previewSrc} />
    </video>
  );
}

export default PreviewPlayer;
