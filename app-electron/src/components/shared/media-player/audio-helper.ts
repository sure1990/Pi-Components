class AudioHelper {
  private readonly _audio: HTMLAudioElement;
  constructor(src: string) {
    this._audio = new Audio(src);
  }

  public get IsPaused(): boolean {
    return this._audio.paused;
  }
}
