import { Frame } from "./types";

type KeyProgressProps = {
  KeyCode: string;
  Frames: Frame[];
};
const KeyProgress = (props: KeyProgressProps) => {
  const { KeyCode } = props;
  return (
    <div className="progress">
      <div className="progress-bar">{KeyCode}</div>
    </div>
  );
};

export default KeyProgress;
