import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('InvokeApi', (method: string, body: any) =>
  ipcRenderer.invoke('api', method, body)
);

contextBridge.exposeInMainWorld('SendSignal', (msg: string) =>
  ipcRenderer.send('hw-sync', msg)
);

contextBridge.exposeInMainWorld('ConnectToWs', () =>
  ipcRenderer.send('hw-sync-init')
);

contextBridge.exposeInMainWorld('CloseWs', () =>
  ipcRenderer.send('hw-sync-close')
);
