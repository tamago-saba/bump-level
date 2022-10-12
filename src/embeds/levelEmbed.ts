import { Colors, EmbedBuilder } from "discord.js";

export class LevelEmbed {
    embed: EmbedBuilder;

    constructor() {
        this.embed = new EmbedBuilder().setColor(Colors.Aqua);
    }
}
