import { useCallback, useContext, useEffect, useReducer, useRef } from "react";
import MediaPlayerOperationsReducer from "./media-player-operations.reducer";
import { MediaPlayerState, PlayerStateEnum } from "./types";
import {
  End,
  Pause,
  Play,
  Ready,
  Stop,
  UpdateTime,
} from "./media-player-action-creators";
import MediaStatusContext from "../media-status-provider/media-status.context";

const INITIAL_STATE: MediaPlayerState = {
  IsReady: false,
  PlayerState: PlayerStateEnum.STOPPED,
  CurrentPosition: 0,
  Duration: 0,
};

const useMediaPlayerOperations = (src: string) => {
  const [state, dispatch] = useReducer(
    MediaPlayerOperationsReducer,
    INITIAL_STATE
  );
  const { IsReady, PlayerState, Duration, CurrentPosition } = state;
  const audioRef = useRef(new Audio(src));
  const {
    UpdateTime: UpdateTimeToCtx,
    UpdateMediaStatus,
    UpdateDuration,
  } = useContext(MediaStatusContext);

  useEffect(() => {
    UpdateTimeToCtx(CurrentPosition);
  }, [CurrentPosition, UpdateTimeToCtx]);

  useEffect(() => {
    UpdateDuration(Duration);
  }, [Duration, UpdateDuration]);

  useEffect(() => {
    UpdateMediaStatus(PlayerState === PlayerStateEnum.PLAYING);
  }, [PlayerState, UpdateMediaStatus]);

  const PlayPause = useCallback(() => {
    const { current: audio } = audioRef;
    if (PlayerState === PlayerStateEnum.PLAYING) {
      audio.pause();
    } else {
      audio.play();
    }
  }, [PlayerState]);

  const StopPlayback = useCallback(() => {
    const { current: audio } = audioRef;
    audio.pause();
    audio.currentTime = 0;
    dispatch(Stop());
  }, []);

  useEffect(() => {
    const { current: audio } = audioRef;

    const onCanPlayThrough = () => {
      dispatch(Ready(audio.duration));
    };

    const onEnded = () => {
      dispatch(End());
    };

    const onPause = () => {
      dispatch(Pause());
    };

    const onPlay = () => {
      dispatch(Play());
    };
    const onTimeUpdate = () => {
      dispatch(UpdateTime(audio.currentTime));
    };

    audio.oncanplaythrough = onCanPlayThrough;
    audio.onended = onEnded;
    audio.onpause = onPause;
    audio.onplay = onPlay;
    audio.ontimeupdate = onTimeUpdate;

    return () => {
      const audio = audioRef.current;
      audio.oncanplaythrough = null;
      audio.onended = null;
      audio.onpause = null;
      audio.onplay = null;
      audio.ontimeupdate = null;
      audioRef.current = null;
    };
  }, [dispatch]);

  return {
    IsReady,
    TotalDuration: Duration,
    CurrentPosition: CurrentPosition,
    IsStopped: PlayerState === PlayerStateEnum.STOPPED,
    IsPaused: PlayerState === PlayerStateEnum.PAUSED,
    PlayPause,
    StopPlayback,
  };
};

export default useMediaPlayerOperations;
