type Frame = {
  Start: number;
  End: number;
};

type KeyFrames = {
  [key: string]: Frame[];
};

export { Frame, KeyFrames };
