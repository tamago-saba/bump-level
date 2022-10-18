import { ChatInputCommandInteraction } from "discord.js";
import { getAboutEmbed } from "../embeds";

export const sendAbout = async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply({ embeds: [getAboutEmbed()] });
};
