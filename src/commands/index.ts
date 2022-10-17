import { CacheType, Interaction } from "discord.js";
import { Bot } from "../bot";
import { sendLevel } from "./level";
import { sendTop } from "./top";

export const execCommand = async (
    bot: Bot,
    interaction: Interaction<CacheType>
) => {
    if (!interaction.isChatInputCommand()) return;

    switch (interaction.commandName) {
        case "level":
            sendLevel(bot.storage, interaction);
            break;
        case "top":
            sendTop(bot.storage, interaction);
    }
};
