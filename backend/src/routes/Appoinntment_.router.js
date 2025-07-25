import {Router} from "express";
import { createAppointment, getAppointments, updateAppointmentStatus } from "../controllers/DoctorAppointment.js";

const Appointmentrouter = Router();

Appointmentrouter.post("/appointments", createAppointment);
Appointmentrouter.get("/getAppointmentRequest", getAppointments);
Appointmentrouter.patch("/appointments/:appointmentId", updateAppointmentStatus);

export default Appointmentrouter;
