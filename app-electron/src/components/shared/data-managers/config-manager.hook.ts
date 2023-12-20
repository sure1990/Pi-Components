import { useCallback } from "react";
import { KeyFrame } from "../../media-config-manager/types";

const useConfigManager = () => {
  const saveFrames = useCallback(
    async (frames: { [key: string]: KeyFrame[] }) => {
     
      const result = await window.InvokeApi("Frames:Save", frames);

      console.log("saveFrames", result);
    },
    []
  );

  return { Save: saveFrames };
};

export default useConfigManager;
