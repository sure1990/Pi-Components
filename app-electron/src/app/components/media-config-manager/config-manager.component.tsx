import KeyFrames from './key-frames/key-frames.component';
import { useMediaStatus } from '../media-player';
import { useKeyPressTracker, useConfigManager } from '../../shared/hooks';
import { useEffect } from 'react';
import { DataProvider } from './data-provider';
import { Button } from 'react-bootstrap';

const ConfigManager = () => {
  const { IsPlaying, CurrentTime, Duration } = useMediaStatus();
  const { saveTracks, onKeyDown, onKeyUp, tracks, keyMapping } =
    useConfigManager();
  const { Attach, Remove, Init } = useKeyPressTracker();

  useEffect(() => {
    Init(onKeyDown, onKeyUp);
  }, [onKeyDown, onKeyUp]);

  useEffect(() => {
    const c = IsPlaying ? Attach : Remove;
    c();
  }, [IsPlaying]);

  return (
    <DataProvider keyMapping={keyMapping}>
      <div className="row mt-3">
        {Duration > 0 && (
          <div className="col-md">
            {Object.keys(tracks)
              .map((x) => +x)
              .filter((k) => tracks[k].length > 0)
              .map((k) => {
                const frames = tracks[k];
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
        )}
      </div>
      <div className="fixed-bottom">
        <Button variant="success" onClick={saveTracks}>
          Save
        </Button>
      </div>
    </DataProvider>
  );
};

export default ConfigManager;
