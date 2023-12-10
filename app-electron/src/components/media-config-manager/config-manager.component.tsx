import KeyFrames from "./key-frames/key-frames.component";
import { useMediaStatus } from "../shared/media-player";
import useKeyPressTracker from "../shared/key-press-tracker/key-press-tracker.hook";
import { useCallback, useEffect, useRef, useState } from "react";
import { KeyFrame } from "./types";

const ConfigManager = () => {
  const { IsPlaying, CurrentTime, Duration } = useMediaStatus();
  const currentTimeRef = useRef(CurrentTime);
  useEffect(() => {
    currentTimeRef.current = CurrentTime;
  }, [CurrentTime]);

  const [keys, setKeys] = useState<{
    [key: string]: KeyFrame[];
  }>({});

  const onKeyDown = useCallback((key: string) => {
    setKeys((prev) => {
      const current = currentTimeRef.current;
      const updated = { ...prev };
      if (updated[key] === undefined) {
        updated[key] = [{ start: 0, end: current, isNone: true }];
      }

      const frames = [...updated[key]];
      const lastFrame = frames[frames.length - 1];
      if (lastFrame.isNone) {
        lastFrame.end = current;
      }
      frames.push({ start: current, isNone: false });

      updated[key] = frames;
      return updated;
    });
  }, []);
  const onKeyUp = useCallback((key: string) => {
    setKeys((prev) => {
      const current = currentTimeRef.current;
      const updated = { ...prev };
      if (updated[key]) {
        const frames = [...updated[key]];
        const lastFrame = frames[frames.length - 1];
        frames[frames.length - 1] = { ...lastFrame, end: current };
        frames.push({ start: current, isNone: true });
        updated[key] = frames;
      }
      return updated;
    });
  }, []);

  const { Attach, Remove } = useKeyPressTracker(onKeyDown, onKeyUp);

  useEffect(() => {
    const c = IsPlaying ? Attach : Remove;
    c();
  }, [IsPlaying]);

  return (
    <div className="row mt-3">
      <div className="col-md">
        {Object.keys(keys).map((k) => {
          const frames = keys[k];
          return (
            <KeyFrames
              key={k}
              frames={frames}
              map={k}
              max={Duration}
              current={CurrentTime}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ConfigManager;
