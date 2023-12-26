import { useCallback, useEffect, useState } from 'react';
import { KeyFrame } from '../../types';
import { KeyTrigger, InsertTracksRequest } from '../../../../shared/types';

const useConfigManager = () => {
  const [keys, setKeys] = useState<{ [key: string]: Omit<KeyTrigger, 'Key'> }>(
    {}
  );
  useEffect(() => {
    window.InvokeApi<KeyTrigger[]>('KeyMap:Select').then((x) => {
      setKeys(
        x.reduce((prev, curr) => {
          return { ...prev, [curr.Key]: { ...curr } };
        }, keys)
      );
    });
  }, []);

  const saveFrames = useCallback(
    async (frames: { [key: string]: KeyFrame[] }) => {
      const requestBody: InsertTracksRequest = {
        MusicId: 1,
        Tracks: Object.keys(frames)
          .filter((k) => frames[k].length > 0)
          .map((k) => {
            return {
              TriggerId: keys[k].TriggerId,
              Frames: frames[k].map((x) => ({ Start: x.start, End: x.end })),
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
