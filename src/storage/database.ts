/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as sqlite3 from "sqlite3";
import { homedir } from "os";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { LevelData } from "../models/levelData";

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
}
