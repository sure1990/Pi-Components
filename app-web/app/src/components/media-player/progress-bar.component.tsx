import { FC } from "react";

type ProgressBarProps = {
  timeProgress: number;
  duration: number;
  progressBarRef: React.MutableRefObject<any>;
  audioRef: React.MutableRefObject<any>;
};

const ProgressBar: FC<ProgressBarProps> = ({
  progressBarRef,
  audioRef,
  timeProgress,
  duration,
}) => {
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  return (
    <>
      <div>
        <input
          type="range"
          ref={progressBarRef}
          defaultValue="0"
          onChange={handleProgressChange}
          style={{ width: "100%" }}
        />
      </div>
      <div className="d-flex">
        <div className="mr-auto p-2">
          <span className="badge badge-pill badge-secondary">
            {formatTime(timeProgress)}
          </span>
        </div>
        <div className="p-2">
          <span className="badge badge-pill badge-secondary">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </>
  );
};

const formatTime = (time: number) => {
  if (time && !isNaN(time)) {
    const minutes = Math.floor(time / 60);
    const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(time % 60);
    const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formatMinutes}:${formatSeconds}`;
  }
  return "00:00";
};

export default ProgressBar;
