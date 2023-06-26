import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { ICreateFrameRequest, ITrackFrame } from "./types";
import { SQLiteDb } from "../../lib/sqlite";
import path from "path";

@JsonController("/track/:trackId/frames")
export class TrackFrameController {
  @Get()
  public async GetFrames(
    @Param("trackId") trackId: number
  ): Promise<ITrackFrame[]> {
    let result: ITrackFrame[] = [];
    let db: SQLiteDb | null = null;
    try {
      db = new SQLiteDb(path.resolve("./database/app-db.db"));
      result = await db.SelectAll<ITrackFrame>(
        `
        SELECT TimeStamp,PinNo,State FROM tblTrackFrames
        WHERE TrackId=?
        ORDER BY TimeStamp
        `,
        [trackId]
      );
    } catch (error) {
      console.error(error);
    } finally {
      if (db) db.Close();
    }
    return result;
  }

  @Post()
  async CreateFrames(
    @Body() request: ICreateFrameRequest[],
    @Param("trackId") trackId: number
  ): Promise<number> {
    let db: SQLiteDb | null = null;
    try {
      db = new SQLiteDb(path.resolve("./database/app-db.db"));
      return await db.Insert(
        "tblTrackFrames",
        ["TrackId", "TimeStamp", "PinNo", "State"],
        request.map((x) => [trackId, x.TimeStamp, x.PinNo, x.State])
      );
    } catch (error) {
      console.error(error);
      return 0;
    } finally {
      if (db) db.Close();
    }
  }
}
