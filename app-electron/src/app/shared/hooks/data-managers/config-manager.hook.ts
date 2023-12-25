import { useCallback, useEffect, useState } from 'react';
import { KeyFrame } from '../../types';
import { KeyTrigger } from '../../../../shared/types';

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
      const result = await window.InvokeApi('Tracks:Insert', frames);

      console.log('saveFrames', result);
    },
    []
  );

  return { Save: saveFrames, KeyMapping: keys };
};

export default useConfigManager;
