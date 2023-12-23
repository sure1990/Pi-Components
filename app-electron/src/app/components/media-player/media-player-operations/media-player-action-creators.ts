import { MediaPlayerAction, MediaPlayerActionType } from "./types";

export function Ready(duration: number): MediaPlayerAction {
  return {
    type: MediaPlayerActionType.INITIALIZATION_DONE,
    payload: { duration },
  };
}
export function UpdateTime(time: number): MediaPlayerAction {
  return {
    type: MediaPlayerActionType.UPDATE_TIME,
    payload: { time },
  };
}
export function Stop(): MediaPlayerAction {
  return { type: MediaPlayerActionType.STOP };
}

export function End(): MediaPlayerAction {
  return { type: MediaPlayerActionType.ENDED };
}
export function Pause(): MediaPlayerAction {
  return { type: MediaPlayerActionType.PAUSE };
}
export function Play(): MediaPlayerAction {
  return { type: MediaPlayerActionType.PLAY };
}
