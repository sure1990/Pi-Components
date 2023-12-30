import { SavedTracks } from '../../../../shared/types';
import { InterfacingService } from '../../services';
import { TrackSyncActionsEnum } from './types';

export class TrackSyncWorker {
  private worker: Worker;
  constructor() {
    this.worker = new Worker(new URL('./worker.ts', import.meta.url), {
      name: 'TrackSyncWorker',
    });
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
    InterfacingService.Reset();
  }
}
