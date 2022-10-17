import { Colors, EmbedBuilder, Guild, User } from "discord.js";
import { LevelData } from "./models/levelData";

export const getTopEmbed = (
    topData: LevelData[],
    guild: Guild | null
): EmbedBuilder => {
    if (topData.length === 0) {
        return new EmbedBuilder()
            .setColor(Colors.Aqua)
            .setDescription("まだ誰もBUMPしていません...");
    } else {
        return new EmbedBuilder()
            .setColor(Colors.Aqua)
            .setAuthor({
                name: `Top ${topData.length} "Bumpers"`,
                iconURL: guild?.iconURL() || undefined,
            })
            .setDescription(
                `${topData
                    .map(
                        (data, index) =>
                            `#${index + 1}. <@!${data.id}> - EXP: ${data.exp}`
                    )
                    .join("\n")}`
            );
    }
};

export const getProfileEmbed = (data: LevelData, user: User): EmbedBuilder => {
    if (
        data.count == undefined ||
        data.ap == undefined ||
        data.exp == undefined
    ) {
        return new EmbedBuilder()
            .setColor(Colors.Aqua)
            .setDescription("あなたはまだbumpしていません！");
    } else {
        return new EmbedBuilder()
            .setColor(Colors.Aqua)
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
};

export const getExpUpEmbed = (
    oldExp: string,
    newExp: string,
    bonus: string
): EmbedBuilder => {
    return new EmbedBuilder()
        .setColor(Colors.Aqua)
        .setDescription(`EXP: ${oldExp} ➜ ${newExp} (ボーナス: ${bonus})`);
};
