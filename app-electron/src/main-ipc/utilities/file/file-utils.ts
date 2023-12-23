import { app } from 'electron';
import path from 'path';
import fs from 'fs';

function GetAppPath() {
  return path.join(app.getPath('appData'), 'mf-client');
}

function CreateAppDir() {
  const appDir = GetAppPath();
  if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir, { recursive: true });
  }
}

export default { GetAppPath, CreateAppDir };
