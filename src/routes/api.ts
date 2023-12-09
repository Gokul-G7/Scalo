// server/routes/api.js
const express = require('express');
const router = express.Router();
import { Meeting } from "../Schema/meeting.schema";
import { Request, Response } from "express";
import { createMeeting, fetchMeetings } from "../services/meeting.service";

router.post('/meetings', async (req: Request, res: Response) => {
    try {
        const { scheduledTime } = req.body;
        let meetings = await fetchMeetings(scheduledTime);
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
        const meeting = await createMeeting(req.body);
        res.status(201).json(meeting);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
});

export default router;