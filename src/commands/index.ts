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
            await sendLevel(bot.storage, interaction);
            break;
        case "top":
            await sendTop(bot.storage, interaction);
    }
};
