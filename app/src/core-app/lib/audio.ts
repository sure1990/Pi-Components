export class AudioPlayer {
  private readonly _audio: HTMLAudioElement;

  public OnTimeUpdate: (ts: number) => void;
  public OnDurationUpdated: (totalTime: number) => void;
  public OnPlay: () => void;
  public OnPause: () => void;
  public OnStop: () => void;

  constructor(src: string) {
    this._audio = new Audio(src);
    this.bindEvents();
  }

  private bindEvents() {
    this._audio.ontimeupdate = () => {
      if (this.OnTimeUpdate) {
        this.OnTimeUpdate(this._audio.currentTime);
      }
    };

    this._audio.ondurationchange = () => {
      if (this.OnDurationUpdated) {
        this.OnDurationUpdated(this._audio.duration);
      }
    };

    this._audio.onplay = () => {
      if (this.OnPlay) {
        this.OnPlay();
      }
    };
  }

  public Play() {
    this._audio.play();
  }

  public Pause() {
    this._audio.pause();
    if (this.OnPause) this.OnPause();
  }

  public Stop() {
    this._audio.pause();
    this._audio.currentTime = 0;

    if (this.OnStop) this.OnStop();
  }

  public get IsPaused() {
    return this._audio.paused;
  }

  public get IsStopped() {
    return this._audio.paused && this._audio.currentTime === 0;
  }
}
