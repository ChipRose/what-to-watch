import { useState, useRef, useEffect } from 'react';

type VideoPlayerProps = {
  playerIndex: number;
  src: string;
  poster: string;
  width?: number;
  height?: number;
  isPlaying: boolean;
  onMouseEnter: (id: number) => void;
  onMouseLeave: () => void;
}

function VideoPlayer({ playerIndex, src, poster, isPlaying, onMouseEnter, onMouseLeave, ...props }: VideoPlayerProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const handleMouseEnter = () => {
    onMouseEnter(playerIndex);
  };

  useEffect(() => {
    if (videoRef?.current === null) {
      return;
    }

    videoRef?.current?.addEventListener('loadeddata', () => setIsLoading(false));
    if (!isLoading && isPlaying) {
      videoRef?.current?.play();
      return;
    }

    videoRef?.current?.pause();
    videoRef.current.currentTime = 0;
    videoRef.current.load();

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
      <source src={src} />
    </video>
  );
}

export default VideoPlayer;
