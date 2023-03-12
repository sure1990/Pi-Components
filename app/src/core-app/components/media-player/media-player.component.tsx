import { useEffect, useState } from "react";
import { AudioPlayer } from "../../lib/audio";
import MediaPlayerProgress from "./media-player-progress.component";

import "./media-player.component.css";

let player: AudioPlayer;

type MediaPlayerProps = {
  src: string;
};

const MediaPlayer = (props: MediaPlayerProps) => {
  const { src } = props;
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

  const handlePlayPause = () => {
    if (isPaused) player.Play();
    else player.Pause();
  };

  const handleStop = () => {
    player.Stop();
  };

  return (
    <div className="border border-info">
      <div className="text-center">
        <div className="btn-group p-2">
          <button className="btn btn-sm btn-info" type="button">
            Reverse
          </button>
          <button
            className="btn btn-sm btn-success"
            type="button"
            onClick={handlePlayPause}
          >
            {isPaused ? "PLAY" : "PAUSE"}
          </button>
          <button
            className="btn btn-sm btn-danger"
            type="button"
            onClick={handleStop}
          >
            Stop
          </button>
          <button className="btn btn-sm btn-info" type="button">
            Forward
          </button>
        </div>
      </div>
      <div className="d-flex flex-column progress-container">
        <MediaPlayerProgress />
      </div>
      <div className="duration-container">
        <div className="float-left">
          <span className="badge badge-pill badge-secondary">Secondary</span>
        </div>
        <div className="float-right">
          <span className="badge badge-pill badge-secondary">Secondary</span>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;
