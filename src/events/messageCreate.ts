import { Message } from "discord.js";
import { isBumpMessage } from "../utils/disboard";
import { getReward } from "../utils/calculator";
import { getExpUpEmbed } from "../embeds";
import { waitForEmbed } from "../utils/waitForEmbed";
import { updateRoles } from "../utils/roleManager";
import { Bot } from "../bot";

export const onMessageCreate = async (bot: Bot, message: Message) => {
    if (message.author === bot.client.user) return;

    await waitForEmbed(message);

    if (!isBumpMessage(bot, message)) return;

    const interactorId = message.interaction?.user.id;
    if (!interactorId) return;

    const reward = getReward(bot);
    await bot.storage.updateLevelData(interactorId, reward.exp.toString());

    const newExp = (await bot.storage.getLevelData(interactorId)).exp;
    const oldExp = newExp - reward.exp;
    const expUpEmbed = getExpUpEmbed(
        oldExp.toString(),
        newExp.toString(),
        reward.bonus.toString()
    );
    message.channel.send({ embeds: [expUpEmbed] });

    if (message.guild !== null) {
        updateRoles(bot, message.guild);
    }

    bot.bumpTracker.recordBump();
};
