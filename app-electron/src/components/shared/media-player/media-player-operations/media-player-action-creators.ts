import { MediaPlayerAction, MediaPlayerActionType } from "./types";

export function Ready(): MediaPlayerAction {
  return { type: MediaPlayerActionType.INITIALIZATION_DONE };
}
