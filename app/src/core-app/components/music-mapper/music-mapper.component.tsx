import { useCallback, useEffect, useRef, useState } from "react";
import { useKeyListener } from "../../hooks";
import KeyProgress from "./key-progress.component";
import { Frame, KeyFrames } from "./types";
type MusicMapperProps = {
  isPaused: boolean;
  currentTime: number;
  totalTime: number;
};

const MusicMapper = (props: MusicMapperProps) => {
  const { isPaused, currentTime, totalTime } = props;
  const [frames, setFrames] = useState<KeyFrames>({});

  const _currentTime = useRef(0);
  const _totalTime = useRef(0);

  useEffect(() => {
    _currentTime.current = currentTime;
    _totalTime.current = totalTime;
  }, [currentTime, totalTime]);

  useEffect(() => {
    setFrames((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        updated[key].forEach((n) => n.UpdateCurrent(currentTime));
      });

      return updated;
    });
  }, [currentTime]);

  const OnKeyDown = useCallback((key: string) => {
    console.log("OnKeyDown:", _currentTime.current);

    setFrames((prev) => {
      const updated = { ...prev };
      if (!updated[key]) {
        updated[key] = [];
      }
      const currentKeyFrames = [
        ...updated[key],
        new Frame(
          _currentTime.current,
          _currentTime.current,
          _totalTime.current
        ),
      ];
      updated[key] = currentKeyFrames;
      return updated;
    });
  }, []);
  const OnKeyUp = useCallback((key: string) => {
    console.log("OnKeyUp:", _currentTime.current);
    setFrames((prev) => {
      const updated = { ...prev };
      const currentKeyFrames = [...updated[key]];
      currentKeyFrames[currentKeyFrames.length - 1].Finish();
      updated[key] = currentKeyFrames;
      return updated;
    });
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
          <div className="p-2" key={x}>
            <KeyProgress KeyCode={x} Frames={frames[x]} />
          </div>
        );
      })}
    </div>
  );
};
export default MusicMapper;
