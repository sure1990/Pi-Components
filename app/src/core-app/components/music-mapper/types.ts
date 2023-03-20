class Frame {
  private _isDone = false;
  constructor(
    private readonly _start: number,
    private _end: number,
    private readonly _total: number
  ) {}

  get Start() {
    return this._start;
  }
  get End() {
    return this._end;
  }
  get Width() {
    return ((this._end - this._start) / this._total) * 100;
  }

  public UpdateCurrent(time: number) {
    if (!this._isDone) this._end = time;
  }

  public Finish() {
    this._isDone = true;
  }
}

type KeyFrames = {
  [key: string]: Frame[];
};

export { Frame, KeyFrames };
