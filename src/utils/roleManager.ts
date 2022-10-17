import { Colors, Guild } from "discord.js";
import { Bot } from "../bot";

export const updateRoles = async (bot: Bot, guild: Guild) => {
    const basePoint = 20;
    const bumperRoleName = "Active Bumper";

    bot.storage.getAllLevelData().then((allData) =>
        allData.forEach(async (data) => {
            const member = guild.members.cache.get(data.id);
            const memberBumperRoles = member?.roles.cache.filter(
                (role) => role.name === bumperRoleName
            );
            const guildBumperRole = guild.roles.cache.find(
                (role) => role.name === bumperRoleName
            );

            if (data.ap < basePoint) {
                memberBumperRoles?.forEach((role) =>
                    member?.roles.remove(role)
                );
            } else {
                if (memberBumperRoles?.size === 0) {
                    member?.roles
                        .add(
                            guildBumperRole ||
                                (await guild.roles.create({
                                    name: bumperRoleName,
                                    color: Colors.Yellow,
                                }))
                        )
                        .catch(console.error);
                }
            }
        })
    );
};
