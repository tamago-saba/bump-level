import { Message } from "discord.js";
import { Bot } from "../bot";

export const isBumpMessage = (bot: Bot, message: Message): boolean => {
    if (bot.config.isDebug) {
        return message.author.id === bot.config.disboardId;
    }
    return (
        (message.author.id === bot.config.disboardId &&
            message.embeds
                .find(() => true)
                ?.description?.startsWith("表示順をアップしたよ")) ||
        false
    );
};
