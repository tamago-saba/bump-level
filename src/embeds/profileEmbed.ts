import { EmbedBuilder, User } from "discord.js";
import { LevelData } from "../models/userData";
import { LevelEmbed } from "./levelEmbed";

export class ProfileEmbed extends LevelEmbed {
    constructor() {
        super();
    }

    getEmbed(data: LevelData, user: User): EmbedBuilder {
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
        return this.embed;
    }
}
