const { REST, SlashCommandBuilder, Routes } = require("discord.js");
const dotenv = require("dotenv");

dotenv.config();

const applicationId = process.env.APPLICATION_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.TOKEN;

const commands = [
    new SlashCommandBuilder()
        .setName("level")
        .setDescription("個人のデータを表示します"),
    new SlashCommandBuilder()
        .setName("top")
        .setDescription("ランキングを表示します"),
    new SlashCommandBuilder()
        .setName("about")
        .setDescription("BOTの情報を表示します"),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

rest.put(Routes.applicationGuildCommands(applicationId, guildId), {
    body: commands,
})
    .then((data) =>
        console.log(
            `Successfully registered ${data.length} application commands.`
        )
    )
    .catch(console.error);
