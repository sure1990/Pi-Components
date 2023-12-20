import { app } from "electron";
import path from "path";
import fs, { Dir } from "fs";

export function GetAppPath() {
  return path.join(app.getPath("appData"), "vrtdesigns");
}

export function CreateAppDir() {
  const appDir = GetAppPath();
  if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir, { recursive: true });
  }
}
