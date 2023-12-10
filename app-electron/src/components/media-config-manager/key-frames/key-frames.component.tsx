import ProgressBar from "react-bootstrap/ProgressBar";
import "./key-frames.component.scss";
import { FC } from "react";
import { KeyFrame } from "../types";

type KeyFramesProps = {
  max: number;
  frames: KeyFrame[];
  current: number;
  map: string;
};

const KeyFrames: FC<KeyFramesProps> = ({ frames, max, current, map }) => {
  return (
    <ProgressBar className="mt-2">
      {frames.map((f, index) => {
        return CreateFrame(
          `${map}_${index}`,
          max,
          GetProgress(f.start, f.end ?? current),
          GetVariant(f.isNone),
          GetClassName(f.isNone)
        );
      })}
    </ProgressBar>
  );
};

function CreateFrame(
  key: string,
  max: number,
  progress: number,
  variant: string = "success",
  className?: string
) {
  return (
    <ProgressBar
      variant={className ? undefined : variant}
      key={key}
      now={progress}
      className={className}
      max={max}
    />
  );
}

function GetProgress(start: number, end: number) {
  return end - start;
}

function GetVariant(isNone: boolean) {
  return !isNone ? "success" : undefined;
}

function GetClassName(isNone: boolean) {
  return isNone ? "bg-none" : undefined;
}

export default KeyFrames;
