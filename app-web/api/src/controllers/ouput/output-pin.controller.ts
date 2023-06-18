import { Body, Get, JsonController, Post } from "routing-controllers";
import { ICreateMapRequest, IPinMapping } from "./types";
import { SQLiteDb } from "../../lib/sqlite";
import path from "path";

@JsonController("/output")
export class OutputPinController {
  @Post()
  public async CreateMap(@Body() reqBody: ICreateMapRequest) {
    try {
      const { Key, PinNo } = reqBody;
      const db = new SQLiteDb(path.resolve("./database/app-db.db"));
      const result = await db.Insert(
        "tblPinMapping",
        ["PinNo", "Key"],
        [[PinNo, Key]]
      );

      return result;
    } catch (error) {
      console.error(error);
      return 0;
    }
  }

  @Get()
  public async GetAll() {
    try {
      const db = new SQLiteDb(path.resolve("./database/app-db.db"));
      return await db.SelectAll<IPinMapping>(`
      SELECT PinNo,Key FROM tblPinMapping
      `);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
