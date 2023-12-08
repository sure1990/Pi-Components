import {
  MediaPlayerState,
  MediaPlayerAction,
  MediaPlayerActionType,
} from "./types";

const MediaPlayerOperationsReducer = (
  state: MediaPlayerState,
  action: MediaPlayerAction
) => {
  let updatedState = state;

  switch (action.type) {
    case MediaPlayerActionType.INITIALIZATION_DONE:
      updatedState = { ...state, IsReady: true };
      break;
    default:
      updatedState = { ...state };
  }

  return updatedState;
};

export default MediaPlayerOperationsReducer;
