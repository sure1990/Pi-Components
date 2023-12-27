import { useCallback, useRef, useState } from 'react';

type KeyTrackEvent = (key: string) => void;

const useKeyPressTracker = () => {
  const [, setPressed] = useState<string[]>([]);
  const pressedRef = useRef<string[]>([]);
  const keyEventsCbRef = useRef<[KeyTrackEvent, KeyTrackEvent] | null>(null);

  const init = useCallback(
    (onKeyDown: KeyTrackEvent, onKeyUp: KeyTrackEvent) => {
      keyEventsCbRef.current = [onKeyDown, onKeyUp];
    },
    []
  );

  const handleKeyDown = useCallback((ev: KeyboardEvent) => {
    ev.stopPropagation();
    ev.preventDefault();
    if (pressedRef.current.includes(ev.key)) return;
    setPressed((prev) => {
      const updated = [...prev, ev.key];
      pressedRef.current = updated;
      return updated;
    });

    if (keyEventsCbRef.current) {
      keyEventsCbRef.current[0](ev.key);
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

    if (keyEventsCbRef.current) {
      keyEventsCbRef.current[1](ev.key);
    }
  }, []);

  const attachEvents = useCallback(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  }, [handleKeyDown, handleKeyUp]);

  const removeEvents = useCallback(() => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);

    setPressed([]);
    pressedRef.current = [];
  }, [handleKeyDown, handleKeyUp]);

  return { Attach: attachEvents, Remove: removeEvents, Init: init };
};

export default useKeyPressTracker;
