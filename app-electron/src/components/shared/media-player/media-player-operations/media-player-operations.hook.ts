import { useCallback, useEffect, useReducer, useRef } from "react";
import MediaPlayerOperationsReducer from "./media-player-operations.reducer";
import { MediaPlayerState } from "./types";
import { Ready } from "./media-player-action-creators";

const INITIAL_STATE: MediaPlayerState = { IsReady: false };

const useMediaPlayerOperations = () => {
  const [state, dispatch] = useReducer(
    MediaPlayerOperationsReducer,
    INITIAL_STATE
  );
  const { IsReady } = state;
  const audioRef = useRef(new Audio(""));

  const onCanPlayThrough = useCallback(() => {
    dispatch(Ready());
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    audio.oncanplaythrough = onCanPlayThrough;

    return () => {
      const audio = audioRef.current;
      audio.oncanplaythrough = null;
      audioRef.current = null;
    };
  }, [dispatch]);

  return { IsReady };
};

export default useMediaPlayerOperations;
