// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

declare global {
  interface Window {
    InvokeApi: <TResponse = any>(
      method: APIMethods,
      body?: APIRequestBody
    ) => Promise<TResponse>;
  }
}
import { APIRequestBody, APIMethods } from './shared/types';
import './renderer-ipc';
