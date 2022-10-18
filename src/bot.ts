import { Client, GatewayIntentBits } from "discord.js";
import { Storage } from "./storage";
import { BumpTracker } from "./utils/bumpTracker";
import { getConfig } from "./config";
import { onMessageCreate } from "./events/messageCreate";
import { onReady } from "./events/ready";
import { execCommand } from "./commands";

export class Bot {
    readonly client: Client;
    readonly storage: Storage;
    readonly bumpTracker: BumpTracker;
    readonly config = getConfig();

    constructor() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ],
        });
        this.storage = new Storage();
        this.bumpTracker = new BumpTracker();

        this.client.on("ready", (client) => {
            onReady(client);
        });
        this.client.on("messageCreate", async (message) => {
            await onMessageCreate(this, message);
        });
        this.client.on("interactionCreate", async (interaction) => {
            await execCommand(this, interaction);
        });
        this.client.on("error", console.error);

        this.client.login(this.config.token).catch(console.error);
    }
}
