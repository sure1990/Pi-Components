export interface ITrackFrame {
  TimeStamp: number;
  PinNo: number;
  State: boolean;
}

export interface ICreateFrameRequest extends ITrackFrame {}
