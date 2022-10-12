import * as sqlite3 from "sqlite3";
import { homedir } from "os";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { LevelData } from "../models/userData";

export class Database {
    private db: sqlite3.Database;

    constructor() {
        const dbParentPath = join(homedir(), ".bump-level");
        const dbPath = join(dbParentPath, "database.db");

        if (!existsSync(dbParentPath)) {
            mkdirSync(dbParentPath);
        }
        if (!existsSync(dbPath)) {
            writeFileSync(dbPath, "", { flag: "w" });
        }

        this.db = new sqlite3.Database(
            dbPath,
            sqlite3.OPEN_READWRITE,
            (err) => {
                if (err) {
                    console.log(err);
                }
                console.log("Connected to the database.");
            }
        );
        this.initDatabase();
    }

    initDatabase(): void {
        const sql =
            "CREATE TABLE IF NOT EXISTS level(id TEXT, count INTEGER, ap INTEGER, exp INTEGER, PRIMARY KEY (id))";
        this.db.run(sql);
    }

    close(): void {
        this.db.close((err) => {
            if (err) {
                console.log(err.message);
            }
            console.log("Close the database connection.");
        });
    }

    getOne(sql: string, params?: string[]): Promise<LevelData> {
        return new Promise((resolve) => {
            this.db.get(sql, params, (err, row) => {
                resolve({
                    id: row?.id,
                    count: row?.count,
                    ap: row?.ap,
                    exp: row?.exp,
                });
            });
        });
    }

    getAll(sql: string, params?: string[]): Promise<LevelData[]> {
        return new Promise((resolve) =>
            this.db.all(sql, params, (err, rows) =>
                resolve(
                    rows.map((row) => {
                        return {
                            id: row.id,
                            count: row.count,
                            ap: row.ap,
                            exp: row.exp,
                        };
                    })
                )
            )
        );
    }

    run(sql: string, params?: string[]): Promise<void> {
        return new Promise((resolve) => this.db.run(sql, params, resolve()));
    }

    // getData(id: string): Promise<LevelData> {
    //     const sql = "SELECT * FROM level WHERE id = ?";

    //     return new Promise((resolve) =>
    //         this.db.get(sql, [id], (err, row) => {
    //             if (err) {
    //                 throw err;
    //             }
    //             resolve({
    //                 id: id,
    //                 count: row?.count,
    //                 ap: row?.ap,
    //                 exp: row?.exp,
    //             });
    //         })
    //     );
    // }

    // getAllData(): Promise<LevelData[]> {
    //     const sql = "SELECT * FROM level";

    //     return new Promise((resolve) =>
    //         this.db.all(sql, [], (err, rows) =>
    //             resolve(
    //                 rows.map((row) => {
    //                     return {
    //                         id: row.id,
    //                         count: row.count,
    //                         ap: row.ap,
    //                         exp: row.exp,
    //                     };
    //                 })
    //             )
    //         )
    //     );
    // }

    // getTop(max: number): Promise<LevelData[]> {
    //     const sql = "SELECT * FROM level ORDER BY exp DESC";

    //     return new Promise((resolve) =>
    //         this.db.all(sql, [], (err, rows) =>
    //             resolve(
    //                 rows.slice(0, max).map((row) => {
    //                     return {
    //                         id: row.id,
    //                         count: row.count,
    //                         ap: row.ap,
    //                         exp: row.exp,
    //                     };
    //                 })
    //             )
    //         )
    //     );
    // }

    // updateLevel(id: string, exp: number): Promise<void> {
    //     this.insertNew(id);
    //     this.reduceOtherAP(id);

    //     const sql =
    //         "UPDATE level SET count = count + 1, ap = ap + 4, exp = exp + ? WHERE id = ?";

    //     return new Promise((resolve) => this.db.run(sql, [exp, id], resolve()));
    // }

    // reduceOtherAP(id: string): void {
    //     const sql = "UPDATE level SET ap = ap - 1 WHERE id != ? AND ap > 0";
    //     this.db.run(sql, [id]);
    // }

    // insertNew(id: string): void {
    //     const sql =
    //         "INSERT OR IGNORE INTO level (id, count, ap, exp) VALUES (?, ?, ?, ?)";
    //     this.db.run(sql, [id, 0, 0, 0]);
    // }
}
