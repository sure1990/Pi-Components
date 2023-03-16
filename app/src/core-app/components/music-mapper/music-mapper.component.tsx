import { useCallback, useEffect, useState } from "react";
import { useKeyListener } from "../../hooks";
import KeyProgress from "./key-progress.component";
import { KeyFrames } from "./types";
type MusicMapperProps = {
  isPaused: boolean;
  currentTime: number;
  totalTime: number;
};

const MusicMapper = (props: MusicMapperProps) => {
  const { isPaused, currentTime, totalTime } = props;
  const [frames, setFrames] = useState<KeyFrames>();

  const OnKeyDown = useCallback((key: string) => {
    setFrames((prev) => {
      const updated = { ...prev };
      const currentKeyFrames = [
        ...updated[key],
        { Start: currentTime, End: currentTime },
      ];
      updated[key] = currentKeyFrames;
      return updated;
    });
  }, []);
  const OnKeyUp = useCallback((key: string) => {
    
  }, []);

  const { addHandler, removeHandler } = useKeyListener(OnKeyDown, OnKeyUp);

  useEffect(() => {
    if (isPaused) {
      removeHandler();
    } else {
      addHandler();
    }
  }, [isPaused]);

  return (
    <div className="d-flex flex-column">
      {Object.keys(frames).map((x) => {
        return (
          <div className="p-2">
            <KeyProgress key={x} KeyCode={x} Frames={frames[x]} />
          </div>
        );
      })}
    </div>
  );
};
export default MusicMapper;
