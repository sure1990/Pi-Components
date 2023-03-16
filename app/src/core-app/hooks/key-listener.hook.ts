import { useEffect, useState, useCallback, useRef } from "react";
import PiService from "../services/pi.service";

type KeyListenerProps = {
  onPress: (key: string) => void;
  onRelease: (key: string) => void;
};

const useKeyListener = (
  onPress: (key: string) => void,
  onRelease: (key: string) => void
) => {
  const [keyTrack, _setKeyTrack] = useState<{ [key: string]: number }>({});

  const keyTrackRef = useRef(keyTrack);

  const setKeyTrack = (state: { [key: string]: number }) => {
    _setKeyTrack((prev) => {
      const newState = { ...prev, ...state };
      keyTrackRef.current = newState;
      return newState;
    });
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { key } = event;

    const track = keyTrackRef.current[key];
    if (track === undefined || track === 0) {
      // PiService.On(GetAscii(key) - 64)
      setKeyTrack({ [key]: 1 });
      onPress(key);
    }
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const { key } = event;

    if (keyTrackRef.current[key] != undefined) {
      // PiService.Off(GetAscii(key) - 64)
      setKeyTrack({ [key]: 0 });
      onRelease(key);
    }
  }, []);

  const addHandler = () => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
  };

  const removeHandler = () => {
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("keyup", handleKeyUp);
  };

  useEffect(() => {
    return () => removeHandler();
  }, []);

  return { addHandler, removeHandler };
};

function GetAscii(key: string) {
  return key.charCodeAt(0);
}

export default useKeyListener;
