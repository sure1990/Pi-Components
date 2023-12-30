import { FC, memo, useEffect, useRef } from 'react';
type FrameProgressProps = {
  className?: string;
  width: number;
};
const FrameProgress: FC<FrameProgressProps> = ({ className, width }) => {
  const barRef = useRef<HTMLDivElement>();
  useEffect(() => {
    if (barRef && barRef.current) {
      barRef.current.style.width = `${width}%`;
    }
  }, [width]);
  return <div ref={barRef} className={`progress-bar ${className ?? ''}`}></div>;
};

export default memo(FrameProgress, (prev, curr) => {
  return prev.width === curr.width && prev.className === curr.className;
});
