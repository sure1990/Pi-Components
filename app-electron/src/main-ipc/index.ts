import { ipcMain } from 'electron';
import api from './api';
import { DbUtils, FileUtils, WSInterface } from './utilities';

export default () => {
  initialize();
  ipcMain.handle('api', (_, ...args) => {
    return api(args[0], args[1]);
  });
  ipcMain.on('hw-sync', (_, msg) => {
    WSInterface.Send(msg);
  });

  ipcMain.on('hw-sync-init', () => {
    WSInterface.Connect();
  });

  ipcMain.on('hw-sync-close', () => {
    WSInterface.Close();
  });
};

function initialize() {
  FileUtils.CreateAppDir();
  DbUtils.InitializeDb();
}
