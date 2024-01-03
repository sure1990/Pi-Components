import { SavedTracks } from '../../../../shared/types';
import { TrackSyncActionsEnum } from './types';

self.onmessage = (event) => {
  const { action, payload } = event.data;
  switch (action) {
    case TrackSyncActionsEnum.INIT:
      init(payload);
      break;
    case TrackSyncActionsEnum.SYNC:
      sync();
      break;
    case TrackSyncActionsEnum.RESET:
      reset(payload);
      break;
  }
};

// let _duration = 0;
let _ticks = 0;
let _timers: NodeJS.Timeout[] = [];
let _tracks: SavedTracks[];
function init(tracks: SavedTracks[]) {
  _tracks = tracks;
}
function reset(time?: number) {
  _ticks = time ?? 0;
  _ticks -= 0.25;
  _timers.forEach(clearTrigger);
  _timers = [];
}
function sync() {
  const tracksFiltered = _tracks.filter(
    (x) => x.Start >= _ticks || x.End >= _ticks
  );

  for (const track of tracksFiltered) {
    startTrigger(
      track.Start <= _ticks ? 0 : track.Start - _ticks,
      track.PinNo,
      track.State
    ).then((x) => _timers.push(x));
  }
}

async function startTrigger(delay: number, pinNo: number, state: number) {
  return setTimeout(() => {
    //To start
    self.postMessage({ PinNo: pinNo, State: state === 1 });
  }, delay * 1000);
}

async function clearTrigger(timer: NodeJS.Timeout) {
  clearTimeout(timer);
}
