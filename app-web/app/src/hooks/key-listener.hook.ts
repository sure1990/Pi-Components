import { useEffect, useState, useCallback, useRef, useContext } from "react";
import MediaPlayerContext from "../context/media-player.context";
import PiService from "../services/pi.service";
import { PIN_MAP } from "./poc";
const pin: { [map: string]: number } = PIN_MAP;
const useKeyListener = (
  onPress: (key: string) => void,
  onRelease: (key: string) => void
) => {
  const [keyTrack, _setKeyTrack] = useState<{ [key: string]: number }>({});

  const { isPaused } = useContext(MediaPlayerContext);

  const keyTrackRef = useRef(keyTrack);

  const setKeyTrack = (state: { [key: string]: number }) => {
    _setKeyTrack((prev) => {
      const newState = { ...prev, ...state };
      keyTrackRef.current = newState;
      return newState;
    });
  };

  useEffect(() => {
    if (isPaused) {
      removeHandler();
    } else {
      addHandler();
    }
  }, [isPaused]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { key } = event;

    const track = keyTrackRef.current[key];
    if (track === undefined || track === 0) {
      PiService.On(pin[key.toLocaleUpperCase()]);
      setKeyTrack({ [key]: 1 });
      onPress(key);
    }
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const { key } = event;

    if (keyTrackRef.current[key] != undefined) {
      PiService.Off(pin[key.toLocaleUpperCase()]);
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
