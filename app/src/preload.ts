// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge } from "electron";
import fs from "fs";

contextBridge.exposeInMainWorld("GetFile", () => {
  const file = fs.readFileSync("C:\\Users\\sures\\Downloads\\sample-15s.mp3");
  return file;
});
