import { Meeting } from "../Schema/meeting.schema";
import { IMeeting } from "../interfaces/meeting";

export const fetchMeetings = async (scheduledTime: Date) => {
    const leastTime = new Date(scheduledTime);
    leastTime.setHours(0);
    leastTime.setMinutes(0);
    leastTime.setSeconds(0);
    const higherTime = new Date(scheduledTime);
    higherTime.setHours(23);
    higherTime.setMinutes(59);
    higherTime.setSeconds(59);

    const orConditions = [
        {
            $and: [
                { scheduledTime: { $gte: leastTime } },
                { scheduledTime: { $lte: higherTime } }
            ]
        },
        {
            $and: [
                { pattern: 'weekly' },
                { scheduledTime: { $lt: leastTime } }
            ]
        },
        {
            $and: [
                { pattern: 'monthly' },
                { scheduledTime: { $lt: leastTime } }
            ]
        },
        {
            $and: [
                { pattern: 'daily' },
                { scheduledTime: { $lt: leastTime } }
            ]
        }

    ]
    return await Meeting.find(
        { $or: orConditions }
    ).sort({
        scheduledTime: -1
    });
}

export const createMeeting = async (data: IMeeting) => {
    try {
        const response = await Meeting.create(data);
        return response;
    } catch (error) {
        console.log("Create Meering Error", error);
        return null;
    }
}