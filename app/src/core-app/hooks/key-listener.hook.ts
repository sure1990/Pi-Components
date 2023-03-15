import { useEffect, useState, useCallback, useRef } from "react";
import PiService from "../services/pi.service";

const useKeyListener = () => {
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
    console.log(key, GetAscii(key));
    const track = keyTrackRef.current[key];
    if (track === undefined || track === 0) {
      // PiService.On(GetAscii(key) - 64)
      setKeyTrack({ [key]: 1 });
    }
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const { key } = event;

    if (keyTrackRef.current[key] != undefined) {
      // PiService.Off(GetAscii(key) - 64)
      setKeyTrack({ [key]: 0 });
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

  return { keyTrack, addHandler, removeHandler };
};

function GetAscii(key: string) {
  return key.charCodeAt(0);
}

export default useKeyListener;
