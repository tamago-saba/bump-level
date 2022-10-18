import { Colors, Guild } from "discord.js";
import { Bot } from "../bot";

export const updateRoles = async (bot: Bot, guild: Guild) => {
    const basePoint = 20;
    const bumperRoleName = "Active Bumper";

    const allData = await bot.storage.getAllLevelData();
    for (const data of allData) {
        const member = guild.members.cache.get(data.id);
        const memberBumperRoles = member?.roles.cache.filter(
            (role) => role.name === bumperRoleName
        );
        const guildBumperRole = guild.roles.cache.find(
            (role) => role.name === bumperRoleName
        );

        if (data.ap < basePoint) {
            if (memberBumperRoles !== undefined) {
                for (const role of memberBumperRoles) {
                    await member?.roles.remove(role);
                }
            }
        } else {
            if (memberBumperRoles?.size === 0) {
                await member?.roles.add(
                    guildBumperRole ||
                        (await guild.roles.create({
                            name: bumperRoleName,
                            color: Colors.Yellow,
                        }))
                );
            }
        }
    }
};
