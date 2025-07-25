import Conference from "../models/videoSession.js";
import { v4 as uuidv4 } from "uuid";

export const createConference = async (req, res) => {
  const { doctorId, patientId, scheduledTime } = req.body;

  const roomLink = `https://meet.jit.si/${doctorId}-${patientId}-${uuidv4()}`;

  const conf = new Conference({
    doctorId,
    patientId,
    scheduledTime: new Date(scheduledTime),
    roomLink,
  });

  await conf.save();

  req.io?.to?.(String(patientId)).emit?.(`conferenceNotification-${patientId}`, {
    receiverId: patientId,
    doctorId,
    roomLink,
    scheduledTime,
  });

  res.status(201).json(conf);
};

export const updateStartTime = async (req, res) => {
  const { id } = req.params;
  const conf = await Conference.findByIdAndUpdate(
    id,
    { startTime: new Date() },
    { new: true }
  );
  res.json(conf);
};

export const updateEndTime = async (req, res) => {
  const { id } = req.params;
  const conf = await Conference.findByIdAndUpdate(
    id,
    { endTime: new Date() },
    { new: true }
  );
  res.json(conf);
};

export const getConferenceByUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const conferences = await Conference.find({
      $or: [{ doctorId: parseInt(userId) }, { patientId: parseInt(userId) }],
    }).sort({ createdAt: -1 });
    res.json(conferences);
  } catch (err) {
    console.error("Error in getConferenceByUser:", err);
    res.status(500).json({ message: "Server error" });
  }
};

