import { Client, GatewayIntentBits } from "discord.js";
import { BumpTracker } from "./utils/bumpTracker";
import { Storage } from "./storage";
import { onMessageCreate } from "./events/messageCreate";
import { execCommand } from "./commands";
import { execReady } from "./events/ready";
import { getConfig } from "./config";

const storage = new Storage();

const bumpTracker = new BumpTracker();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.on("ready", (client) => {
    execReady(client);
});

client.on("interactionCreate", async (interaction) => {
    execCommand(storage, interaction);
});

client.on("messageCreate", async (message) => {
    onMessageCreate(storage, message, client, bumpTracker);
});

client.login(getConfig().token);

process.on("SIGTERM", storage.database.close);
