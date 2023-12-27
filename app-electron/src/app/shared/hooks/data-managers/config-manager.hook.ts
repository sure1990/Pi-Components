import { useCallback, useEffect, useState } from 'react';
import { KeyFrame } from '../../types';
import { KeyTrigger, InsertTracksRequest } from '../../../../shared/types';
import { FrameUtils } from '../../utilities';
import { KeyTriggerMap } from '../../../components/media-config-manager/data-provider/types';

const useConfigManager = () => {
  const [keys, setKeys] = useState<KeyTriggerMap>({});
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

  const saveFrames = useCallback(
    async (frames: { [key: number]: KeyFrame[] }) => {
      const requestBody: InsertTracksRequest = {
        MusicId: 1,
        Tracks: Object.keys(frames)
          .filter((k) => frames[+k].length > 0)
          .map((k) => {
            return {
              TriggerId: keys[+k][0].TriggerId,
              Frames: FrameUtils.MergeFrames(frames[+k]).map((x) => ({
                Start: x.start,
                End: x.end,
              })),
            };
          }),
      };
      console.log('requestBody', requestBody);
      const result = await window.InvokeApi('Tracks:Insert', requestBody);

      console.log('saveFrames', result);
    },
    [keys]
  );

  return { Save: saveFrames, KeyMapping: keys };
};

export default useConfigManager;
