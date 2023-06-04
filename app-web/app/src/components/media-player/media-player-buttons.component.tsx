import { memo } from "react";

type ButtonProps = {
  isPaused: boolean;
  onPlayPause: () => void;
  onStop: () => void;
};

const MediaPlayerButtons = (props: ButtonProps) => {
  const { onPlayPause, isPaused, onStop } = props;
  return (
    <div className="text-center">
      <div className="btn-group p-2">
        <button className="btn btn-sm btn-info" type="button">
          Reverse
        </button>
        <button
          className="btn btn-sm btn-success"
          type="button"
          onClick={onPlayPause}
        >
          {isPaused ? "PLAY" : "PAUSE"}
        </button>
        <button
          className="btn btn-sm btn-danger"
          type="button"
          onClick={onStop}
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

export default memo(MediaPlayerButtons);
