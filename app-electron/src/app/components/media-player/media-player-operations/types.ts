export type MediaPlayerState = {
  IsReady: boolean;
  PlayerState: PlayerStateEnum;
  Duration: number;
  CurrentPosition: number;
};

export enum PlayerStateEnum {
  PLAYING,
  PAUSED,
  STOPPED,
}

export type MediaPlayerAction = {
  type: MediaPlayerActionType;
  payload?: any;
};

export enum MediaPlayerActionType {
  INITIALIZATION_DONE,
  STOP,
  PAUSE,
  PLAY,
  UPDATE_TIME,
  ENDED,
}
