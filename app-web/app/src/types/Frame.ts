export class Frame {
  private _isDone = false;
  constructor(
    private readonly _start: number,
    private _end: number,
    private readonly _total: number,
    private readonly _previousFrame?: Frame
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

  get Margin() {
    let margin = 0;
    if (this._previousFrame) {
      margin = ((this._start - this._previousFrame.End) / this._total) * 100;
    }

    return margin;
  }

  public Finish(time: number) {
    this._isDone = true;
    this._end = time;
  }
}
