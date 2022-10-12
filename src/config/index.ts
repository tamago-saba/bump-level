import { config } from "dotenv";

config();

export const getConfig = () => {
    return {
        token: process.env.TOKEN,
        disboardId: process.env.DISBOARD_ID || "302050872383242240",
    };
};
