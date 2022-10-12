import { CacheType, Interaction } from "discord.js";
import { Storage } from "../storage";
import { sendLevel } from "./level";
import { sendTop } from "./top";

export const execCommand = async (
    storage: Storage,
    interaction: Interaction<CacheType>
) => {
    if (!interaction.isChatInputCommand()) return;

    switch (interaction.commandName) {
        case "level":
            sendLevel(storage, interaction);
            break;
        case "top":
            sendTop(storage, interaction);
    }
};
