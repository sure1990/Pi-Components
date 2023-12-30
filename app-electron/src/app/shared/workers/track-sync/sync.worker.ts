import { SavedTracks } from "../../../../shared/types";
import { FrameUtils } from "../../utilities";
import { TrackSyncActionsEnum } from "./types";

let _tracks: { [pinNo: number]: SavedTracks[] } = {};
let _syncedTracks: { [pinNo: number]: number[] } = {};

self.onmessage = (event) => {
  const { action, payload } = event.data;
  switch (action) {
    case TrackSyncActionsEnum.INIT:
      init(payload);
      break;
    case TrackSyncActionsEnum.SYNC:
      sync(payload);
      break;
    case TrackSyncActionsEnum.RESET:
      reset();
      break;
  }
};

function init(tracks: SavedTracks[]) {
  _tracks = tracks.reduce((prev, curr) => {
    return {
      ...prev,
      [curr.PinNo]: [...(prev[curr.PinNo] ?? []), { ...curr }],
    };
  }, _tracks);
  reset();
}

function sync(time: number) {
  Object.keys(_tracks).forEach((x) => syncPerPin(+x, time));
}

async function syncPerPin(pinNo: number, time: number) {
  const tracks = _tracks[pinNo];
  const syncedTracks = _syncedTracks[pinNo];
  const frameToSyncIndex = FrameUtils.GetCurrentFrame(time, tracks);
  if (frameToSyncIndex >= 0 && !syncedTracks.includes(frameToSyncIndex)) {
    syncedTracks.push(frameToSyncIndex);
    const frameToSync = tracks[frameToSyncIndex];
    if (frameToSync) {
      const { PinNo, State } = frameToSync;
      self.postMessage({ PinNo, State: State === 1 });
    }
  }
}

function reset() {
 
  _syncedTracks = Object.keys(_tracks).reduce((prev, curr) => {
    return { ...prev, [+curr]: [] };
  }, _syncedTracks);
}
