import ProgressBar from "react-bootstrap/ProgressBar";
import "./key-frames.component.scss";
import { FC, memo } from "react";
import { KeyFrame } from "../types";
import FrameUtils from "../../shared/utilities/frame.utils";
import Utils from "../../shared/utilities/utils";

type KeyFramesProps = {
  max: number;
  frames: KeyFrame[];
  current: number;
  map: string;
};

const KeyFrames: FC<KeyFramesProps> = ({ frames, max, current, map }) => {
  const rearranged = FrameUtils.ReArrangeFrames(
    frames.map((x) => ({ ...x, end: x.end ?? current })),
    max
  );

  return (
    <ProgressBar className="mt-2">
      {rearranged.map((f, index) => {
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
  return Utils.toFixedDigits(end - start);
}

function GetVariant(isNone: boolean) {
  return !isNone ? "success" : undefined;
}

function GetClassName(isNone: boolean) {
  return isNone ? "bg-none" : undefined;
}

export default memo(KeyFrames, (prev, next) => {
  return (
    prev.frames === next.frames && !next.frames.some((x) => x.end === undefined)
  );
});
