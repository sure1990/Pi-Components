import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("InvokeApi", (method: string, body: any) =>
  ipcRenderer.invoke("api", method, body)
);
