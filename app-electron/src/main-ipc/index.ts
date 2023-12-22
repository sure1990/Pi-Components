import { ipcMain } from "electron";
import api from "./api";
import { DbUtils } from "./utilities";

export default () => {
  initialize();
  ipcMain.handle("api", (_, ...args) => {
    return api(args[0], args[1]);
  });
};

function initialize() {
  DbUtils.InitializeDb();
}
