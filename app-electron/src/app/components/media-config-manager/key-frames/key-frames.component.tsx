import ProgressBar from 'react-bootstrap/ProgressBar';
import './key-frames.component.scss';
import { FC, memo } from 'react';
import { KeyFrame } from '../../../shared/types';
import { FrameUtils, NumericUtils } from '../../../shared/utilities';
import { useConfigManagerDataProvider } from '../data-provider';
import { Badge } from 'react-bootstrap';

type KeyFramesProps = {
  max: number;
  frames: KeyFrame[];
  current: number;
  map: number;
};

const KeyFrames: FC<KeyFramesProps> = ({ frames, max, current, map }) => {
  const { KeyMapping } = useConfigManagerDataProvider();
  const [{ TriggerName }] = KeyMapping[map];

  const rearranged = FrameUtils.ReArrangeFrames(
    frames.map((x) => ({ ...x, end: x.end ?? current })),
    max
  );

  console.log('rearranged', rearranged);

  return (
    <>
      <div className="mt-3">
        <Badge variant="primary" className="mr-1">
          {map}
        </Badge>
        <Badge variant="primary" className="mr-1">
          {TriggerName}
        </Badge>
        {KeyMapping[map].map((x) => (
          <Badge
            variant="secondary"
            className="mr-1"
            key={`badge_${map}_${x.Key}`}
          >
            {`${x.Key}-${x.KeyName}`}
          </Badge>
        ))}
      </div>
      <ProgressBar className="mt-2 progress-height">
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
    </>
  );
};

function CreateFrame(
  key: string,
  max: number,
  progress: number,
  variant: string,
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
  return NumericUtils.toFixedDigits(end - start);
}

function GetVariant(isNone: boolean) {
  return !isNone ? 'success' : undefined;
}

function GetClassName(isNone: boolean) {
  return isNone ? 'bg-none' : undefined;
}

export default memo(KeyFrames, (prev, next) => {
  return (
    prev.frames === next.frames && !next.frames.some((x) => x.end === undefined)
  );
});
