import { useEffect } from "react";

type ProgressProps = {
  CurrentTime: number;
  TotalDuration: number;
};

const MediaPlayerProgress = (props: ProgressProps) => {
  const { CurrentTime, TotalDuration } = props;

  return (
    <>
      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        value={CurrentProgress(CurrentTime, TotalDuration)}
        style={{ width: "100%" }}
        readOnly
      />
    </>
  );
};

function CurrentProgress(currentTime: number, totalTime: number) {
  return currentTime && totalTime && totalTime > 0 && currentTime > 0
    ? (currentTime / totalTime) * 100
    : 0;
}

export default MediaPlayerProgress;
