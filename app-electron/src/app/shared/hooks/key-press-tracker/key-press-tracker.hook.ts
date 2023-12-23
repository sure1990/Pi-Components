import { useCallback, useRef, useState } from "react";

type KeyTrackEvent = (key: string) => void;

const useKeyPressTracker = (
  onKeyDown?: KeyTrackEvent,
  onKeyUp?: KeyTrackEvent
) => {
  const [, setPressed] = useState<string[]>([]);
  const pressedRef = useRef<string[]>([]);

  const handleKeyDown = useCallback((ev: KeyboardEvent) => {
    ev.stopPropagation();
    ev.preventDefault();
    if (pressedRef.current.includes(ev.key)) return;
    setPressed((prev) => {
      const updated = [...prev, ev.key];
      pressedRef.current = updated;
      return updated;
    });

    if (onKeyDown) {
      onKeyDown(ev.key);
    }
  }, []);

  const handleKeyUp = useCallback((ev: KeyboardEvent) => {
    ev.stopPropagation();
    ev.preventDefault();
    setPressed((prev) => {
      const updated = prev.filter((x) => x !== ev.key);
      pressedRef.current = updated;
      return updated;
    });
    if (onKeyUp) {
      onKeyUp(ev.key);
    }
  }, []);

  const attachEvents = useCallback(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  }, [handleKeyDown, handleKeyUp]);

  const removeEvents = useCallback(() => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);

    setPressed([]);
    pressedRef.current = [];
  }, [handleKeyDown, handleKeyUp]);

  return { Attach: attachEvents, Remove: removeEvents };
};

export default useKeyPressTracker;
