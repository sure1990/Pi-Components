// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

declare global {
  interface Window {
    InvokeApi: <TResponse = any>(
      method: APIMethods,
      body?: APIRequestBody
    ) => Promise<TResponse>;
    SendSignal: (msg: string) => void;
    ConnectToWs: () => void;
    CloseWs: () => void;
  }
}
import { APIRequestBody, APIMethods } from './shared/types';
import './renderer-ipc';
