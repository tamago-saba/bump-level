import { Client, Colors, Guild, Message } from "discord.js";
import { Storage } from "../storage";
import { BumpTracker } from "../utils/bumpTracker";
import { isBumpMessage } from "../utils/disboard";
import { getBonusExp } from "../utils/calculator";
import { ExpUpEmbed } from "../embeds/expUpEmbed";
import { waitForEmbed } from "../utils/waitForEmbed";

export const onMessageCreate = async (
    storage: Storage,
    message: Message,
    client: Client,
    bumpTracker: BumpTracker
) => {
    if (message.author === client.user) {
        return;
    }

    await waitForEmbed(message);

    if (!isBumpMessage(message)) {
        return;
    }

    const interactorId = message.interaction?.user.id;
    if (!interactorId) return;

    const offset = 7200000;
    const bonus =
        bumpTracker.lastBump !== undefined
            ? getBonusExp(Date.now() - bumpTracker.lastBump - offset)
            : 0;
    const givenExp = 10 + bonus;

    await storage.updateLevelData(interactorId, givenExp.toString());

    const newExp = (await storage.getLevelData(interactorId)).exp;
    const oldExp = newExp - givenExp;
    const expUpEmbed = new ExpUpEmbed(
        oldExp.toString(),
        newExp.toString(),
        bonus.toString()
    );
    message.channel.send({ embeds: [expUpEmbed.embed] });

    if (message.guild !== null) {
        updateRoles(storage, message.guild);
    }

    bumpTracker.recordBump();
};

const updateRoles = async (storage: Storage, guild: Guild) => {
    const basePoint = 20;
    const bumperRoleName = "Active Bumper";

    storage.getAllLevelData().then((allData) =>
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
