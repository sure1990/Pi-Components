import { ipcMain } from "electron";
import api from "./api";


export default () => {
  ipcMain.handle("api", (_, ...args) => {
    return api(args[0], args[1])});
};

function createDatabase(){
  
}
