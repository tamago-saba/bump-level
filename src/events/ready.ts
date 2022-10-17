import { Client } from "discord.js";

export const onReady = (client: Client<true>) => {
    console.log(
        `Logged in as ${client.user.username} on ${client.guilds.cache.size} servers.`
    );
    client.user.setPresence({
        activities: [{ name: "bump-level" }],
        status: "online",
    });
};
