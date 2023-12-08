export type MediaPlayerState = {
  IsReady: boolean;
};

export type MediaPlayerAction = {
  type: MediaPlayerActionType;
  payload?: any;
};

export enum MediaPlayerActionType {
  INITIALIZATION_DONE,
}
