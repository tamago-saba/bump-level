import { Database } from "./database";

export class Storage {
    database: Database;

    constructor() {
        this.database = new Database();
    }

    getLevelData(id: string) {
        return this.database.getOne("SELECT * FROM level WHERE id = ?", [id]);
    }

    getAllLevelData() {
        return this.database.getAll("SELECT * FROM level");
    }

    getTop() {
        return this.database.getAll("SELECT * FROM level ORDER BY exp DESC");
    }

    async updateLevelData(id: string, exp: string) {
        await this.database.run(
            "INSERT OR IGNORE INTO level (id, count, ap, exp) VALUES (?, ?, ?, ?)",
            [id, "0", "0", "0"]
        );
        await this.database.run(
            "UPDATE level SET ap = ap - 1 WHERE id != ? AND ap > 0",
            [id]
        );
        await this.database.run(
            "UPDATE level SET count = count + 1, ap = ap + 4, exp = exp + ? WHERE id = ?",
            [exp, id]
        );
    }
}
