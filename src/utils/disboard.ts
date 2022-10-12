import { Message } from "discord.js";
import { getConfig } from "../config";

export const isBumpMessage = (message: Message): boolean => {
    return (
        (message.author.id === getConfig().disboardId &&
            message.embeds
                .find(() => true)
                ?.description?.startsWith("表示順をアップしたよ")) ||
        false
    );
};
