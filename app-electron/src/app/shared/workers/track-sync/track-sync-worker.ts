import { SavedTracks } from '../../../../shared/types';
import { InterfacingService } from '../../services';
import { TrackSyncActionsEnum } from './types';

// eslint-disable-next-line import/no-unresolved
import SyncWorker from 'worker-loader!./effect-sync.worker.ts';

export class TrackSyncWorker {
  private worker: Worker;
  constructor() {
    this.worker = new SyncWorker();
    //  new Worker(new URL('./worker.ts', import.meta.url), {
    //   name: 'TrackSyncWorker',
    // });
    this.worker.onmessage = (event) => {
      const { PinNo, State } = event.data;
      InterfacingService.Signal(PinNo, State);
    };
  }

  Init(tracks: SavedTracks[]) {
    this.worker.postMessage({
      action: TrackSyncActionsEnum.INIT,
      payload: tracks,
    });
  }

  Sync() {
    this.worker.postMessage({
      action: TrackSyncActionsEnum.SYNC,
      // payload: time,
    });
  }

  Reset(time: number) {
    this.worker.postMessage({
      action: TrackSyncActionsEnum.RESET,
      payload: time,
    });
    InterfacingService.Reset();
  }
}
