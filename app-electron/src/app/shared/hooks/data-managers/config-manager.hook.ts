import { useCallback, useEffect } from 'react';
import { KeyFrame } from '../../types';

const useConfigManager = () => {
  useEffect(() => {
    window.InvokeApi('KeyMap:Select');
  }, []);

  const saveFrames = useCallback(
    async (frames: { [key: string]: KeyFrame[] }) => {
      const result = await window.InvokeApi('Tracks:Insert', frames);

      console.log('saveFrames', result);
    },
    []
  );

  return { Save: saveFrames };
};

export default useConfigManager;
