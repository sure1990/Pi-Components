import { Body, Get, JsonController, Post } from "routing-controllers";
import { ICreateMapRequest, IPinMapping } from "./types";
import { SQLiteDb } from "../../lib/sqlite";
import path from "path";

@JsonController("/output")
export class OutputPinController {
  @Post()
  public async CreateMap(@Body() reqBody: ICreateMapRequest) {
    let db: SQLiteDb | null = null;
    try {
      const { Key, PinNo } = reqBody;
      db = new SQLiteDb(path.resolve("./database/app-db.db"));
      const result = await db.Insert(
        "tblPinMapping",
        ["PinNo", "Key"],
        [[PinNo, Key]]
      );

      return result;
    } catch (error) {
      console.error(error);
      return 0;
    } finally {
      if (db) {
        db.Close();
      }
    }
  }

  @Get()
  public async GetAll() {
    let db: SQLiteDb | null = null;
    try {
      db = new SQLiteDb(path.resolve("./database/app-db.db"));
      return await db.SelectAll<IPinMapping>(`
      SELECT PinNo,Key FROM tblPinMapping
      ORDER BY PinNo
      `);
    } catch (error) {
      console.error(error);
      return [];
    } finally {
      if (db) {
        db.Close();
      }
    }
  }
}
