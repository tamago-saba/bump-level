import { ChatInputCommandInteraction } from "discord.js";
import { Storage } from "../storage";
import { TopEmbed } from "../embeds/topEmbed";

export async function sendTop(
    storage: Storage,
    interaction: ChatInputCommandInteraction
) {
    const top = (await storage.getTop()).slice(0, 10);
    const topEmbed = new TopEmbed();
    const embed = topEmbed.getEmbed(top, interaction.guild);

    interaction.reply({ embeds: [embed] });
}
