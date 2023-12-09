import mongoose, { Schema } from "mongoose";


const meetingSchema: Schema = new Schema({
    name: { type: String, required: [true, "can't be blank"] },
    description: { type: String, required: [true, "can't be blank"] },
    duration: { type: Number, required: [true, "can't be blank"] },
    isRepeat: { type: Boolean, required: [true, "can't be blank"] },
    pattern: { type: String, enum: ['daily', 'weekly', 'monthly','None'], required: [true, "can't be blank"], default: "None" },
    scheduledTime: { type: Date, required: [true, "can't be blank"] },
}, {
    timestamps: true
});


export const Meeting = mongoose.model('Meeting', meetingSchema);