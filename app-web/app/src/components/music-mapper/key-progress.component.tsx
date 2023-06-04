import { memo, useEffect } from "react";
import { Frame } from "../../types";

type KeyProgressProps = {
  KeyCode: string;
  Frames: Frame[];
};
const KeyProgress = (props: KeyProgressProps) => {
  const { KeyCode, Frames } = props;
  return (
    <div className="progress">
      {Frames.map((frame, index) => (
        <PerFrame key={index} Width={frame.Width} Margin={frame.Margin} />
      ))}
    </div>
  );
};

const PerFrame = memo(
  ({ Width, Margin }: { Width: number; Margin: number }) => {
    return (
      <div
        className="progress-bar"
        style={{ width: `${Width}%`, marginLeft: `${Margin}%` }}
      ></div>
    );
  }
);

export default memo(KeyProgress);
