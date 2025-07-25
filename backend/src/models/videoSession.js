import mongoose from "mongoose";

const conferenceSchema = new mongoose.Schema({
   doctorId: { type: Number, required: true },
  patientId: { type: Number, required: true },
  roomLink: { type: String, required: true },

  scheduledTime: { type: Date, required: true }, // when doctor scheduled the meeting
  startTime: { type: Date }, // when actual call started
  endTime: { type: Date },   // when it ended

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Conference", conferenceSchema);
