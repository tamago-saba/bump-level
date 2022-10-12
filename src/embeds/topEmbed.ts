import { EmbedBuilder, Guild } from "discord.js";
import { LevelData } from "../models/userData";
import { LevelEmbed } from "./levelEmbed";

export class TopEmbed extends LevelEmbed {
    constructor() {
        super();
    }

    getEmbed(topData: LevelData[], guild: Guild | null): EmbedBuilder {
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
        return this.embed;
    }
}
