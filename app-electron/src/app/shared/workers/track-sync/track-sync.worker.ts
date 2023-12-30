import { SavedTracks } from '../../../../shared/types';
import { TrackSyncActionsEnum } from './types';

export class TrackSyncWorker {
  private worker: Worker;
  constructor() {
    this.worker = new Worker(new URL('./worker.ts', import.meta.url), {
      name: 'TrackSyncWorker',
    });
  }

  Init(tracks: SavedTracks[]) {
    this.worker.postMessage({
      action: TrackSyncActionsEnum.INIT,
      payload: tracks,
    });
  }

  Sync(time: number) {
    this.worker.postMessage({
      action: TrackSyncActionsEnum.SYNC,
      payload: time,
    });
  }

  Reset() {
    this.worker.postMessage({
      action: TrackSyncActionsEnum.RESET,
    });
  }
}
