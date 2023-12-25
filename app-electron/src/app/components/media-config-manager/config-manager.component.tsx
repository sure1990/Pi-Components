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

  const { Save, KeyMapping } = useConfigManager();
  useEffect(() => {
    currentTimeRef.current = CurrentTime;
  }, [CurrentTime]);

  const [keys, setKeys] = useState<{
    [key: string]: KeyFrame[];
  }>({});

  useEffect(() => {
    let initialKeys: { [key: string]: KeyFrame[] } = {};
    Object.keys(KeyMapping).forEach((k) => {
      initialKeys = { ...initialKeys, [k]: [] };
    });
    setKeys(initialKeys);
  }, [KeyMapping]);

  const onKeyDown = useCallback((key: string) => {
    setKeys((prev) => {
      if (!prev[key]) return prev;
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
      if (!prev[key]) return prev;
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
    <DataProvider keyMapping={KeyMapping}>
      <div className="row mt-3">
        <div className="col-md">
          {Object.keys(keys)
            .filter((k) => keys[k].length > 0)
            .map((k) => {
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
    </DataProvider>
  );
};

export default ConfigManager;
