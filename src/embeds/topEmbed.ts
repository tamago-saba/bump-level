import { Guild } from "discord.js";
import { LevelData } from "../models/userData";
import { LevelEmbed } from "./levelEmbed";

export class TopEmbed extends LevelEmbed {
    constructor(topData: LevelData[], guild: Guild | null) {
        super();
        this.setEmbed(topData, guild);
    }

    setEmbed(topData: LevelData[], guild: Guild | null) {
        if (topData.length === 0) {
            this.embed.setDescription("まだ誰もBUMPしていません...");
        } else {
            this.embed
                .setAuthor({
                    name: `Top ${topData.length} "Bumpers"`,
                    iconURL: guild?.iconURL() || undefined,
                })
                .setDescription(
                    `${topData
                        .map(
                            (data, index) =>
                                `#${index + 1}. <@!${data.id}> - EXP: ${
                                    data.exp
                                }`
                        )
                        .join("\n")}`
                );
        }
    }
}
