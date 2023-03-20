import { useEffect } from "react";
import { Frame } from "./types";

type KeyProgressProps = {
  KeyCode: string;
  Frames: Frame[];
};
const KeyProgress = (props: KeyProgressProps) => {
  const { KeyCode, Frames } = props;
  return (
    <div className="progress">
      {Frames.map((frame, index) => (
        <div
          key={index}
          className="progress-bar"
          style={{ width: `${frame.Width}%` }}
        >
          {KeyCode}
        </div>
      ))}
    </div>
  );
};

export default KeyProgress;
