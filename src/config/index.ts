import * as dotenv from "dotenv";
import { Config } from "../models/config";

dotenv.config();

export const getConfig = (): Config => {
    return {
        token: process.env.TOKEN,
        disboardId: process.env.DISBOARD_ID || "302050872383242240",
        isDebug: process.env.DEBUG !== undefined ? true : false,
    };
};
