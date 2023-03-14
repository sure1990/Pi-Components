import { useEffect, useState } from "react";
import moment from "moment";
import { AudioPlayer } from "../../lib/audio";
import MediaPlayerProgress from "./media-player-progress.component";

import "./media-player.component.css";
import MediaPlayerButtons from "./media-player-buttons.component";

let player: AudioPlayer;

type MediaPlayerProps = {
  src: string;
  onPlayPause?: (paused: boolean) => void;
  onTimeChange?(time: number): void;
};

const MediaPlayer = (props: MediaPlayerProps) => {
  const { src, onPlayPause, onTimeChange } = props;
  useEffect(() => {
    player = new AudioPlayer(src);
    player.OnPlay = () => setIsPaused(false);
    player.OnPause = () => setIsPaused(true);
    player.OnTimeUpdate = (ts) => setCurrentTime(ts);
    player.OnDurationUpdated = (totalTime) => setTotalTime(totalTime);
  }, []);

  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    if (currentTime === totalTime) {
      setIsPaused(true);
    }
  }, [totalTime, currentTime]);

  useEffect(() => {
    if (onPlayPause) onPlayPause(isPaused);
  }, [isPaused]);

  useEffect(() => {
    if (onTimeChange) onTimeChange(currentTime);
  }, [currentTime]);

  const handlePlayPause = () => {
    if (isPaused) player.Play();
    else player.Pause();
  };

  const handleStop = () => {
    player.Stop();
  };

  return (
    <div className="border border-info">
      <MediaPlayerButtons
        onPlayPause={handlePlayPause}
        onStop={handleStop}
        isPaused={isPaused}
      />
      <div className="d-flex flex-column progress-container">
        <MediaPlayerProgress
          CurrentTime={currentTime}
          TotalDuration={totalTime}
        />
      </div>
      <div className="d-flex">
        <div className="mr-auto p-2">
          <span className="badge badge-pill badge-secondary">
            {formatted(currentTime)}
          </span>
        </div>
        <div className="p-2">
          <span className="badge badge-pill badge-secondary">
            {formatted(totalTime)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;

const formatted = (seconds: number) =>
  moment.utc(seconds * 1000).format("mm:ss");
