import { LevelEmbed } from "./levelEmbed";

export class ExpUpEmbed extends LevelEmbed {
    constructor(oldExp: string, newExp: string, bonus: string) {
        super();
        this.setEmbed(oldExp, newExp, bonus);
    }

    setEmbed(oldExp: string, newExp: string, bonus: string) {
        this.embed.setDescription(
            `EXP: ${oldExp} ➜ ${newExp} (ボーナス: ${bonus})`
        );
    }
}
