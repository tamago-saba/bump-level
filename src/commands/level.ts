import { ChatInputCommandInteraction } from "discord.js";
import { Storage } from "../storage";
import { ProfileEmbed } from "../embeds/profileEmbed";

export const sendLevel = async (
    storage: Storage,
    interaction: ChatInputCommandInteraction
) => {
    const data = await storage.getLevelData(interaction.user.id);
    const profileEmbed = new ProfileEmbed();
    const embed = profileEmbed.getEmbed(data, interaction.user);

    interaction.reply({ embeds: [embed] });
};
