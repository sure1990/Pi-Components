import KeyFrames from "./key-frames/key-frames.component";
import { useMediaStatus } from "../shared/media-player";
import useKeyPressTracker from "../shared/key-press-tracker";
import { useCallback, useEffect, useRef, useState } from "react";
import { KeyFrame } from "./types";
import FrameUtils from "../shared/utilities/frame.utils";
import { Button } from "react-bootstrap";
import useConfigManager from "../shared/data-managers/config-manager.hook";

const ConfigManager = () => {
  const { IsPlaying, CurrentTime, Duration } = useMediaStatus();

  const currentTimeRef = useRef(CurrentTime);

  const { Save } = useConfigManager();
  useEffect(() => {
    currentTimeRef.current = CurrentTime;
  }, [CurrentTime]);

  const [keys, setKeys] = useState<{
    [key: string]: KeyFrame[];
  }>({});

  const onKeyDown = useCallback((key: string) => {
    setKeys((prev) => {
      const updated = { ...prev };
      updated[key] = FrameUtils.StartFrame(
        currentTimeRef.current,
        updated[key] ?? []
      );
      return updated;
    });
  }, []);

  const onKeyUp = useCallback((key: string) => {
    setKeys((prev) => {
      const current = currentTimeRef.current;
      const updated = { ...prev };
      if (updated[key]) {
        updated[key] = FrameUtils.EndFrame(current, updated[key]);
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
    <>
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
      <div className="fixed-bottom">
        <Button variant="success" onClick={() => Save(keys)}>
          Save
        </Button>
      </div>
    </>
  );
};

export default ConfigManager;
