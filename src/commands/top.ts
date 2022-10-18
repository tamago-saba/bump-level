import { ChatInputCommandInteraction } from "discord.js";
import { Storage } from "../storage";
import { getTopEmbed } from "../embeds";

export async function sendTop(
    storage: Storage,
    interaction: ChatInputCommandInteraction
) {
    const top = (await storage.getTop()).slice(0, 10);
    const topEmbed = getTopEmbed(top, interaction.guild);

    await interaction.reply({ embeds: [topEmbed] });
}
