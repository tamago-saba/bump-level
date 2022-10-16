import { User } from "discord.js";
import { LevelData } from "../models/userData";
import { LevelEmbed } from "./levelEmbed";

export class ProfileEmbed extends LevelEmbed {
    constructor(data: LevelData, user: User) {
        super();
        this.setEmbed(data, user);
    }

    setEmbed(data: LevelData, user: User) {
        if (
            data.count == undefined ||
            data.ap == undefined ||
            data.exp == undefined
        ) {
            this.embed.setDescription("あなたはまだbumpしていません！");
        } else {
            this.embed
                .setAuthor({
                    name: user.username,
                    iconURL: user.avatarURL() || undefined,
                })
                .addFields(
                    {
                        name: "EXP",
                        value: data.exp.toString(),
                        inline: true,
                    },
                    {
                        name: "アクティブポイント",
                        value: data.ap.toString(),
                        inline: true,
                    },
                    {
                        name: "BUMP数",
                        value: data.count.toString(),
                        inline: true,
                    }
                );
        }
    }
}
