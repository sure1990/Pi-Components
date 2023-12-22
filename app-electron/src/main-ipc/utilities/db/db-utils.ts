import { FileUtils, SQLiteDb } from "..";
import path from "path";
import fs from "fs";

function GetDbPath() {
  const basePath = FileUtils.GetAppPath();
  return path.join(basePath, "app_db");
}

function InitializeDb() {
  const db = new SQLiteDb(GetDbPath());

  //   fs.readdirSync(path.join(".", "scripts"))
  //     .filter((x) => path.extname(x).toLowerCase() === ".sql")
  //     .forEach((filePath) => {
  //       const script = fs.readFileSync(filePath, "utf-8");
  //       db.Exec(script);
  //     });
  db.Exec(`CREATE TABLE "tbl_Key_Frames_Join" (
	"id"	INTEGER NOT NULL,
	"start"	NUMERIC,
	PRIMARY KEY("id")
);`);

  db.Close();
}

export default { GetDbPath, InitializeDb };
