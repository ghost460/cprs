import express from "express";
import VideoSession from "../models/videoSession.js";
const router = express.Router();

router.post("/start", async (req, res) => {
  try {
    const session = new VideoSession(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:appointmentId", async (req, res) => {
  try {
    const session = await VideoSession.findOne({ appointmentId: req.params.appointmentId });
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;