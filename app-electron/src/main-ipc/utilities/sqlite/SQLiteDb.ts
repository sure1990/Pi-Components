import { Database } from "sqlite3";
import { getQuery } from "./insert";

export class SQLiteDb {
  private readonly _db: Database;
  constructor(private readonly _dbPath: string) {
    this._db = new Database(_dbPath);
  }

  public Close() {
    try {
      if (this._db) this._db.close();
    } catch (error) {
      throw error;
    }
  }

  public async Insert(
    tableName: string,
    columns: string[],
    values: any[][]
  ): Promise<number> {
    const query = getQuery(tableName, columns, values);

    const result = await new Promise<number>((resolve, reject) => {
      this._db.run(
        query,
        values.reduce((a, b) => a.concat(b)),
        function (err) {
          if (err) {
            return reject(err);
          }
          resolve(this.lastID);
        }
      );
    });

    return result;
  }

  public async Update(query: string, params: any[] = []) {
    const result = await new Promise<number>((resolve, reject) => {
      this._db.run(query, params, function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.changes);
      });
    });

    return result;
  }

  public async Delete(query: string, params: any[] = []) {
    return this.Update(query, params);
  }

  public async SelectAll<T>(query: string, params: any[] = []): Promise<T[]> {
    const result = await new Promise<T[]>((resolve, reject) => {
      this._db.all<T>(query, params, function (err, rows) {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });

    return result;
  }

  public async Select<T>(query: string, params: any[] = []): Promise<T> {
    const result = await new Promise<T>((resolve, reject) => {
      this._db.get<T>(query, params, function (err, row) {
        if (err) {
          return reject(err);
        }
        return resolve(row);
      });
    });

    return result;
  }

  public async Exec(query: string): Promise<void> {
    const result = await new Promise((resolve, reject) => {
      this._db.exec(query, function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  }
}
