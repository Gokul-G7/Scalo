import { Date } from "mongoose";

export interface meeting {
    name: string,
    description: string,
    duration: number,
    isRepeat: boolean,
    pattern: "daily" | "weekly" | "monthly",
    scheduledTime: Date
}