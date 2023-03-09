import { useEffect, useState } from "react";
import { AudioPlayer } from "../../lib/audio";
import { useKeyListener } from "../../hooks";
let player: AudioPlayer;
const MediaPlayer = ({ src }: { src: string }) => {
  // useKeyListener();
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
    <div className="text-center">
      <div className="btn-group">
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
  );
};

export default MediaPlayer;
