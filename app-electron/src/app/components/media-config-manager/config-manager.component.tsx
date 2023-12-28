import KeyFrames from './key-frames/key-frames.component';
import { useMediaStatus } from '../media-player';
import { useKeyPressTracker, useConfigManager } from '../../shared/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import { KeyFrame } from '../../shared/types';
import { FrameUtils } from '../../shared/utilities';
import { DataProvider } from './data-provider';
import { Button } from 'react-bootstrap';

const ConfigManager = () => {
  const { IsPlaying, CurrentTime, Duration } = useMediaStatus();

  const currentTimeRef = useRef(CurrentTime);

  const { Save, KeyMapping, SavedTracks } = useConfigManager();
  useEffect(() => {
    currentTimeRef.current = CurrentTime;
  }, [CurrentTime]);

  const [keys, setKeys] = useState<{
    [pin: number]: KeyFrame[];
  }>({});

  useEffect(() => {
    setKeys(SavedTracks);
  }, [SavedTracks]);

  const onKeyDown = useCallback(
    (key: string) => {
      const triggers = Object.keys(KeyMapping)
        .map((t) => +t)
        .filter((t) => KeyMapping[t].some((x) => x.Key === key));

      if (triggers.length === 0) return;

      setKeys((prev) => {
        const updated = { ...prev };
        for (const trigger of triggers) {
          updated[trigger] = FrameUtils.StartFrame(
            currentTimeRef.current,
            updated[trigger] ?? []
          );
        }
        return updated;
      });
    },
    [KeyMapping]
  );

  const onKeyUp = useCallback(
    (key: string) => {
      const triggers = Object.keys(KeyMapping)
        .filter((t) => KeyMapping[+t].some((x) => x.Key === key))
        .map((t) => +t);
      if (triggers.length === 0) return;
      setKeys((prev) => {
        // if (!prev[key]) return prev;
        const current = currentTimeRef.current;
        const updated = { ...prev };
        for (const trigger of triggers) {
          if (updated[trigger]) {
            updated[trigger] = FrameUtils.EndFrame(current, updated[trigger]);
          }
        }
        return updated;
      });
    },
    [KeyMapping]
  );

  const { Attach, Remove, Init } = useKeyPressTracker();

  useEffect(() => {
    Init(onKeyDown, onKeyUp);
  }, [onKeyDown, onKeyUp]);

  useEffect(() => {
    const c = IsPlaying ? Attach : Remove;
    c();
  }, [IsPlaying]);

  return (
    <DataProvider keyMapping={KeyMapping}>
      <div className="row mt-3">
        <div className="col-md">
          {Object.keys(keys)
            .filter((k) => keys[+k].length > 0)
            .map((k) => {
              const frames = keys[+k];
              console.log(frames);
              return (
                <KeyFrames
                  key={k}
                  frames={frames}
                  map={+k}
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
    </DataProvider>
  );
};

export default ConfigManager;
