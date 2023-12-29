import './key-frames.component.scss';
import { FC, memo } from 'react';
import { KeyFrame } from '../../../shared/types';
import { FrameUtils, NumericUtils } from '../../../shared/utilities';
import { useConfigManagerDataProvider } from '../data-provider';
import { Badge } from 'react-bootstrap';
import FrameProgress from './frame-progress.component';

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
      <div className="progress mt-2 progress-height">
        {rearranged.map((f, index) => (
          <FrameProgress
            key={`${map}_${index}`}
            className={GetClassName(f.isNone)}
            width={GetProgress(f.start, f.end ?? current, max)}
          />
        ))}
      </div>
    </>
  );
};

function GetProgress(start: number, end: number, max: number) {
  return NumericUtils.toFixedDigits(((end - start) / max) * 100);
}

function GetClassName(isNone: boolean) {
  return isNone ? 'bg-danger' : 'bg-success';
}

export default memo(KeyFrames, (prev, next) => {
  return (
    prev.frames === next.frames &&
    prev.max === next.max &&
    !next.frames.some((x) => x.end === undefined) &&
    prev.current === next.current
  );
});
