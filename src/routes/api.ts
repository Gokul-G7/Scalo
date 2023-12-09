// server/routes/api.js
const express = require('express');
const router = express.Router();
import { Meeting } from "../Schema/meeting.schema";
import { Request, Response } from "express";

router.post('/meetings', async (req: Request, res: Response) => {
    try {
        const { scheduledTime } = req.body;
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
        let meetings = await Meeting.find(
            { $or: orConditions }
        ).sort({
            scheduledTime: -1
        });
        meetings = meetings.filter((item) => {
            if (item.patttern == 'weekly') {
                if (new Date(item.scheduledTime).getDay() == new Date(scheduledTime).getDay()) return item;
            } else if (item.pattern == 'monthly') {
                if (new Date(item.scheduledTime).getDate() == new Date(scheduledTime).getDate()) return item;
            } else {
                return item
            }
        })
        res.json(meetings);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/meeting', async (req: Request, res: Response) => {
    try {
        const meeting = await Meeting.create(req.body)
        res.status(201).json(meeting);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
});

export default router;