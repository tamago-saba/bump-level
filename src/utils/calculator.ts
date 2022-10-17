import { Bot } from "../bot";
import { Reward } from "../models/reward";

export const getLevel = (exp: number): number => {
    return Math.round((exp / 10) ** (1 / 2));
};

export const getReward = (bot: Bot): Reward => {
    const offset = 7200000;
    const bonus =
        bot.bumpTracker.lastBump !== undefined
            ? getBonusExp(Date.now() - bot.bumpTracker.lastBump - offset)
            : 0;
    const exp = 10 + bonus;
    return { exp: exp, bonus: bonus };
};

const getBonusExp = (elapsed: number): number => {
    const a = 1000;
    const b = (-1140 + (4560 * a + 1299600) ** 0.5) / 19;
    const c = (315 - (285 * a + 66564) ** 0.5) / 60;
    const f = (x: number) => a / (x * (1 / 60000) + b) + c;
    return f(elapsed) > 0 && f(elapsed) <= 20 ? Math.round(f(elapsed)) : 0;
};
