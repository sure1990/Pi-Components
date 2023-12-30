export class ManualSyncWorker {
  private worker: Worker;
  constructor() {
    this.worker = new Worker(new URL('./worker.ts', import.meta.url), {
      name: 'ManualSyncWorker',
    });
  }

  Sync(pinNo: number, state: boolean) {
    this.worker.postMessage({ PinNo: pinNo, State: state });
  }
}
