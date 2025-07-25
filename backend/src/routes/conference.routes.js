import express from "express";
import {
  createConference,
  updateStartTime,
  updateEndTime,
  getConferenceByUser,
} from "../controllers/conference.controller.js";

const router = express.Router();
router.post("/create", createConference);
router.patch("/start/:id", updateStartTime);
router.patch("/end/:id", updateEndTime);
router.get("/by-user", getConferenceByUser);

export default router;