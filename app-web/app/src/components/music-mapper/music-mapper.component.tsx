import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useKeyListener } from "../../hooks";
import KeyProgress from "./key-progress.component";
import { Frame, KeyFrames } from "../../types";
import MediaPlayerContext from "../../context/media-player.context";
import PiService from "../../services/pi.service";
type MusicMapperProps = {
  isPaused: boolean;
  currentTime: number;
  totalTime: number;
};

const MusicMapper = () => {
  const [frames, setFrames] = useState<KeyFrames>({});

  const _currentTime = useRef(0);
  const _totalTime = useRef(0);

  const { CurrentTime, TotalDuration } = useContext(MediaPlayerContext);

  useEffect(() => {
    _currentTime.current = CurrentTime;
  }, [CurrentTime]);

  useEffect(() => {
    _totalTime.current = TotalDuration;
  }, [TotalDuration]);

  const OnKeyDown = useCallback((key: string) => {
    console.log(_currentTime.current);
    
    // setFrames((prev) => {
    //   const updated = { ...prev };
    //   if (!updated[key]) {
    //     updated[key] = [];
    //   }
    //   const currentKeyFrames = [...updated[key]];
    //   const newFrame = new Frame(
    //     _currentTime.current,
    //     _currentTime.current,
    //     _totalTime.current,
    //     currentKeyFrames.length === 0
    //       ? null
    //       : currentKeyFrames[currentKeyFrames.length - 1]
    //   );
    //   currentKeyFrames.push(newFrame);

    //   updated[key] = currentKeyFrames;
    //   return updated;
    // });
  }, []);
  
  const OnKeyUp = useCallback((key: string) => {
    // setFrames((prev) => {
    //   const updated = { ...prev };
    //   const currentKeyFrames = [...updated[key]];
    //   currentKeyFrames[currentKeyFrames.length - 1].Finish(
    //     _currentTime.current
    //   );
    //   updated[key] = currentKeyFrames;
    //   return updated;
    // });
  }, []);

  useKeyListener(OnKeyDown, OnKeyUp);

  return (
    <div className="d-flex flex-column">
      {/* {Object.keys(frames).map((x) => {
        return (
          <div className="p-2" key={x}>
            <KeyProgress KeyCode={x} Frames={frames[x]} />
          </div>
        );
      })} */}
    </div>
  );
};
export default MusicMapper;
