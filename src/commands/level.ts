import { ChatInputCommandInteraction } from "discord.js";
import { Storage } from "../storage";
import { ProfileEmbed } from "../embeds/profileEmbed";

export const sendLevel = async (
    storage: Storage,
    interaction: ChatInputCommandInteraction
) => {
    const data = await storage.getLevelData(interaction.user.id);
    const profileEmbed = new ProfileEmbed(data, interaction.user);

    interaction.reply({ embeds: [profileEmbed.embed] });
};
