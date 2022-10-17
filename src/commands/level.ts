import { ChatInputCommandInteraction } from "discord.js";
import { Storage } from "../storage";
import { getProfileEmbed } from "../embeds";

export const sendLevel = async (
    storage: Storage,
    interaction: ChatInputCommandInteraction
) => {
    const data = await storage.getLevelData(interaction.user.id);
    const profileEmbed = getProfileEmbed(data, interaction.user);

    interaction.reply({ embeds: [profileEmbed] });
};
