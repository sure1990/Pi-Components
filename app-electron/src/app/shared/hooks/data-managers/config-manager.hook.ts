import { useCallback, useEffect, useState } from 'react';
import { KeyFrame } from '../../types';
import {
  KeyTrigger,
  InsertTracksRequest,
  SavedTracks,
} from '../../../../shared/types';
import { FrameUtils } from '../../utilities';
import { KeyTriggerMap } from '../../../components/media-config-manager/data-provider/types';
import { useMediaStatus } from '../../../components/media-player';

const useConfigManager = () => {
  const [keys, setKeys] = useState<KeyTriggerMap>({});
  const [tracks, setTracks] = useState<{ [pinNo: number]: KeyFrame[] }>({});
  const { Duration } = useMediaStatus();
  useEffect(() => {
    window.InvokeApi<KeyTrigger[]>('KeyMap:Select').then((x) => {
      setKeys(
        x.reduce((prev, curr) => {
          const updated = {
            ...prev,
            [curr.PinNo]: prev[curr.PinNo]
              ? [...prev[curr.PinNo], curr]
              : [curr],
          };

          // return { ...prev, [curr.Key]: { ...curr } };
          return updated;
        }, keys)
      );
    });
  }, []);

  const applySavedTracks = useCallback(async () => {
    const savedTracks = await window.InvokeApi<SavedTracks[]>(
      'Tracks:Fetch',
      1
    );

    let initialKeys: { [key: number]: KeyFrame[] } = {};
    Object.keys(keys)
      .map((x) => +x)
      .forEach((k) => {
        initialKeys = {
          ...initialKeys,
          [k]: savedTracks
            .filter((x) => x.PinNo === k && x.Start === 1)
            .map((p) => ({
              start: p.Start,
              end: p.End,
              isNone: false,
            })),
        };
      });

    setTracks(initialKeys);
  }, [keys]);

  useEffect(() => {
    applySavedTracks();
  }, [applySavedTracks]);

  const saveFrames = useCallback(
    async (frames: { [key: number]: KeyFrame[] }) => {
      const requestBody: InsertTracksRequest = {
        MusicId: 1,
        Tracks: Object.keys(frames)
          .filter((k) => frames[+k].length > 0)
          .map((k) => {
            return {
              TriggerId: keys[+k][0].TriggerId,
              Frames: FrameUtils.ReArrangeFrames(frames[+k], Duration).map(
                (x) => ({ Start: x.start, End: x.end, State: !x.isNone })
              ),
            };
          }),
      };

      await window.InvokeApi('Tracks:Insert', requestBody);
      applySavedTracks();
    },
    [keys]
  );

  return { Save: saveFrames, KeyMapping: keys, SavedTracks: tracks };
};

export default useConfigManager;
