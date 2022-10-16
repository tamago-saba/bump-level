import { Message } from "discord.js";

export const waitForEmbed = async (message: Message) => {
    const isEmpty = () =>
        message.content === "" &&
        message.embeds.length === 0 &&
        message.attachments.size === 0;

    let timeout = false;
    setTimeout(() => {
        timeout = true;
    }, 1000);

    while (isEmpty() && !timeout) {
        await new Promise((r) => setTimeout(r, 10));
    }
};
