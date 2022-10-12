import { Client, Colors, Guild, Message } from "discord.js";
import { Storage } from "../storage";
import { BumpTracker } from "../utils/bumpTracker";
import { isBumpMessage } from "../utils/disboard";
import { getBonusExp } from "../utils/calculator";

const basePoint = 20;
const bumperRoleName = "Active Bumper";

const updateRoles = async (storage: Storage, guild: Guild) => {
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

export const onMessageCreate = async (
    storage: Storage,
    message: Message,
    client: Client,
    bumpTracker: BumpTracker
) => {
    if (message.author === client.user) {
        return;
    }

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

    if (isBumpMessage(message)) {
        const interactorId = message.interaction?.user.id;
        if (!interactorId) return;

        const bonus =
            bumpTracker.lastBump !== undefined
                ? getBonusExp(Date.now() - bumpTracker.lastBump - 7200000)
                : 0;

        await storage.updateLevelData(interactorId, (10 + bonus).toString());

        if (message.guild !== null) {
            updateRoles(storage, message.guild);
        }

        bumpTracker.recordBump();

        return;
    }
};
