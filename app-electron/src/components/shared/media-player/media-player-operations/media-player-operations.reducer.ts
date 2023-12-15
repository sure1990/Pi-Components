import {
  MediaPlayerState,
  MediaPlayerAction,
  MediaPlayerActionType,
  PlayerStateEnum,
} from "./types";

const MediaPlayerOperationsReducer = (
  state: MediaPlayerState,
  action: MediaPlayerAction
) => {
  const { type, payload } = action;
  let updatedState = state;

  switch (type) {
    case MediaPlayerActionType.INITIALIZATION_DONE:
      const { duration } = payload;
      updatedState = {
        ...state,
        IsReady: true,
        Duration: (duration ?? 0).toFixed(5),
      };
      break;
    case MediaPlayerActionType.PLAY:
      updatedState = { ...state, PlayerState: PlayerStateEnum.PLAYING };
      break;
    case MediaPlayerActionType.PAUSE:
      updatedState = { ...state, PlayerState: PlayerStateEnum.PAUSED };
      break;
    case MediaPlayerActionType.STOP:
      updatedState = {
        ...state,
        PlayerState: PlayerStateEnum.STOPPED,
        CurrentPosition: 0,
      };
      break;
    case MediaPlayerActionType.ENDED:
      updatedState = {
        ...state,
        PlayerState: PlayerStateEnum.STOPPED,
      };
      break;
    case MediaPlayerActionType.UPDATE_TIME:
      const { time } = payload;
      updatedState = { ...state, CurrentPosition: time.toFixed(5) };
      break;
    default:
      updatedState = { ...state };
  }

  return updatedState;
};

export default MediaPlayerOperationsReducer;
