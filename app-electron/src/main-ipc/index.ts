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
};

function initialize() {
  FileUtils.CreateAppDir();
  DbUtils.InitializeDb();
}
